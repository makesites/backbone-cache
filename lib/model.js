
	var Model = Parent.Model.extend({

		options: {
			timestamp: false
		},

		cache: function( data ){
			// prerequisites
			if( typeof localStorage == "undefined" ) return;
			// currently only two actions are supported (get & set)
			var name = this.options.cache_key || this.name || "model";
			if( data ){
				if( data[this.idAttribute] ) name += "_"+ data[this.idAttribute];
				// stringify data
				data = JSON.stringify( data );
				if( this.options.timestamp ){
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
				if( this.options.timestamp ){
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
