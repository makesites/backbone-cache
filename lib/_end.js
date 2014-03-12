
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