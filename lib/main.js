

/**
 * @name {{name}}
 * {{description}}
 *
 * Version: {{version}} ({{build_date}})
 * Source: {{repository}}
 *
 * @author {{author}}
 * Initiated by: Makis Tracend (@tracend)
 * Distributed through [Makesites.org](http://makesites.org)
 *
 * @cc_on Copyright © Makesites.org
 * @license Released under the {{license licenses}}
 */

(function (lib) {

	//"use strict";

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		var deps = ['underscore', 'backbone'];
		define(deps, lib); // give the module a name
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


{{{lib}}}


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
