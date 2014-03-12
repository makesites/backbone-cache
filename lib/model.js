
	var Model = Parent.Model.extend({

		cache: function( data ){
			// prerequisites
			if( typeof localStorage == "undefined" ) return;
			// currently only two actions are supported (get & set)
			var name = this.options.cache_key || this.name || "model";
			if( data ){
				if( data[this.idAttribute] ) name += "_"+ data[this.idAttribute];
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
