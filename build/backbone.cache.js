

/**
 * @name backbone.cache
 * Uniform data caching for Backbone.js apps
 *
 * Version: 0.3.5 (Fri, 24 Jun 2016 10:58:06 GMT)
 * Source: http://github.com/makesites/backbone-cache
 *
 * @author makesites
 * Initiated by: Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 *
 * @cc_on Copyright © Makesites.org
 * @license Released under the MIT
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = ['underscore', 'backbone'];
		define('backbone.cache', deps, lib);
	} else if ( typeof module === "object" && module && typeof module.exports === "object" ){
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = lib;
	} else {
		// Browser globals
		lib(window._, window.Backbone);
	}
}(function ( _, Backbone ) {

	//"use strict";
	// define global scope
	window = window || this.window || {};
	var APP = window.APP || false;

	// support for Backbone APP() view if available...
	var isAPP = ( APP !== false );
	var Parent = ( isAPP ) ? APP : Backbone;



	var Collection = Parent.Collection.extend({

		cache: function( data ){
			// prerequisites
			if( typeof localStorage == "undefined" ) return;
			// variables
			var self = this;
			var name = this.options.cache_key || this.name || this.cid;
			var ids;
			// currently only two actions are supported (get & set)
			if( data ){
				// strip the ids from the data
				ids = _.map(data, function(model, num){
					return model.id || model._id;
				});
				return this.store.set(name, JSON.stringify( ids ) );
			} else {
				ids = this.store.get(name);
				if ( _.isNull(ids) || _.isEmpty(ids) ) return [] ;
				ids = JSON.parse( ids );
				// find the data from localStorage
				var model = new this.model();
				// model name
				var mname = model.options.cache_key || model.name || "model";
				var cached = _.map(ids, function(id, num){
					var mdata = self.store.get( mname +"_"+ id);
					return ( _.isNull( mdata ) || _.isEmpty( mdata ) ) ? {} :  JSON.parse( mdata );
				});
				return cached;
			}
		},

		// localStorage
		store : {
			get : function( name ) {
					return localStorage.getItem( name );
			},
			set : function( name, val ){
					// validation first?
					return localStorage.setItem( name, val );
			},
			check : function( name ){
					return ( localStorage.getItem( name ) === null );
			},
			clear: function( name ){
					// actually just removing the local...
					return localStorage.removeItem( name );
			}
		}

	});


	var Model = Parent.Model.extend({

		options: {
			cache_timestamp: false,
			cache_exclude: []
		},

		cache: function( data ){
			// prerequisites
			if( typeof localStorage == "undefined" ) return;
			// currently only two actions are supported (get & set)
			var name = this.options.cache_key || this.name || "model";
			if( data ){
				if( data[this.idAttribute] ) name += "_"+ data[this.idAttribute];
				// exclude keys
				for(var i in this.options.cache_exclude ){
					var key = this.options.cache_exclude[i];
					delete data[key];
				}
				// stringify data
				data = JSON.stringify( data );
				//
				if( this.options.cache_timestamp ){
					// convert data to base64
					data = btoa( data );
					// get timestamp
					var now = Date.now(); // check if milliseconds?
					data = JSON.stringify({ data: data, timestamp: now });
				}
				return this.store.set(name, data);
			} else {
				if( this[this.idAttribute] ) name += "_"+ this[this.idAttribute];
				var cached = this.store.get(name);
				// exit now if chached data doesn't exist;
				if( _.isNull( cached ) || _.isEmpty( cached ) ) return {};
				// parse data
				cached = JSON.parse( cached );
				if( this.options.cache_timestamp ){
					// convert data from base64
					cached = atob( cached.data );
					cached = JSON.parse(cached);
				}
				return cached;
			}
		},

		// localStorage
		store : {
			get : function( name ) {
					return localStorage.getItem( name );
			},
			set : function( name, val ){
					// validation first?
					return localStorage.setItem( name, val );
			},
			check : function( name ){
					return ( localStorage.getItem( name ) === null );
			},
			clear: function( name ){
					// actually just removing the local...
					return localStorage.removeItem( name );
			}
		}

	});

//Views may have their html fragments cached (TBA)
/*
	var View = Parent.View.extend({


	});
*/



	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {

		// replace contructors in APP or Backbone depending what's available
		Parent.Model = Model;
		Parent.Collection = Collection;
		//Parent.View = View;
		window[Parent] = Parent;

	}

	// for module loaders:
	return APP;

}));
