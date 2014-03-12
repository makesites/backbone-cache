// @name {{name}} - {{version}} ({{build_date}})
// @url {{repository}}

// @author {{author}}
// @license {{#license licenses}}{{/license}}

(function(_, Backbone) {

	// support for Backbone APP() view if available...
	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var Parent = (isAPP ) ? APP : Backbone;
