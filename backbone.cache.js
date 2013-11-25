/* **Backbone Cache**
 * _Uniform cache support for Backbone.js apps_
 *
 * Created by Makis Tracend ( @tracend )
 * Source: https://github.com/makesites/backbone-cache
 * 
 * Released under the [MIT License](http://makesites.org/licenses/MIT)
 * (c) Makesites.org
 */

(function(window, _, Backbone) {

var Methods = {
	cache: function( key ){
		// update the local session
		this.store.set(key, JSON.stringify( this.toJSON() ) );
		// check if the object has changed locally
		//...
	},
	// if data request fails request offline mode.
	error: function( model, req, options, error ){
		// consider redirecting based on statusCode
		console.log( req );
	},

	// Stores
	sessionStorage : {
		get : function( name ) {
			return sessionStorage.getItem( name );
		},
		set : function( name, val ){
			// validation first?
			return sessionStorage.setItem( name, val );
		},
		check : function( name ){
			return ( sessionStorage.getItem( name ) == null );
		},
		clear: function( name ){
			// actually just removing the session...
			return sessionStorage.removeItem( name );
		}
	},

	localStorage : {
		get : function( name ) {
			return localStorage.getItem( name );
		},
		set : function( name, val ){
			// validation first?
			return localStorage.setItem( name, val );
		},
		check : function( name ){
			return ( localStorage.getItem( name ) == null );
		},
		clear: function( name ){
			// actually just removing the session...
			return localStorage.removeItem( name );
		}
	},

	cookie : {
		get : function( name ) {
			var i,key,value,cookies=document.cookie.split(";");
			for (i=0;i<cookies.length;i++){
				key=cookies[i].substr(0,cookies[i].indexOf("="));
				value=cookies[i].substr(cookies[i].indexOf("=")+1);
				key=key.replace(/^\s+|\s+$/g,"");
				if (key==name){
					return unescape(value);
				}
			}
		},

		set : function( name, val ){
			// automatically expire session in a day
			var expiry = 86400000;
			var date = new Date( ( new Date() ).getTime() + parseInt(expiry) );
			var value=escape(val) + ((expiry==null) ? "" : "; expires="+date.toUTCString());
			document.cookie=name + "=" + value;
		},

		check : function( name ){
			var cookie=this.get( name );
			if (cookie!=null && cookie!=""){
				return true;
			} else {
				return false;
			}
		},

		clear: function( name ) {
			document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	},

	// Helpers
	// - Creates a unique id for identification purposes
	generateUid : function (separator) {

		var delim = separator || "-";

		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}

		return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
	}
});


})(window, this._, this.Backbone);