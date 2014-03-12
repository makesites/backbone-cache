
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
