// @name backbone.cache - 0.1.0 (Wed, 12 Mar 2014 04:59:21 GMT)
// @url http://github.com/makesites/backbone-cache

// @author makesites
// @license MIT license

(function(_, Backbone) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var Parent = (isAPP ) ? APP : Backbone;


	var Model = Parent.Model.extend({

		options: {

		},

		cache: function( data ){
			// prerequisites
			if( typeof localStorage == "undefined" ) return;
			// currently only two actions are supported (get & set)
			var name = this.options.cache_key || this.name || this.id || this.cid;
			if( data ){
				if( data[this.idAttribute] ) name = data[this.idAttribute];
				return this.store.set(name, JSON.stringify( data ) );
			} else {
				var cached = this.store.get(name);
				return ( _.isNull( cached ) || _.isEmpty( cached ) ) ? {} : JSON.parse( cached );
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
				var cached = _.map(ids, function(id, num){
					var model = self.store.get(id);
					return ( _.isNull(model) || _.isEmpty(model) ) ? {} :  JSON.parse( model );
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

//Views may have their html fragments cached (TBA)

	var View = Parent.View.extend({


	});

	// fallbacks

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Parent;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			define( [], function () { return Parent; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {

		// replace contructors in APP or Backbone depending what's available
		Parent.Model = Model;
		Parent.Collection = Collection;
		Parent.View = View;
		window[Parent] = Parent;

	}


})(this._, this.Backbone);