!function(e){if("function"==typeof define&&define.amd){var t=["underscore","backbone"];define("backbone.cache",t,e)}else"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=e:e(window._,window.Backbone)}(function(e,t){window=window||this.window||{};var o=window.APP||!1,i=o!==!1,n=i?o:t,r=n.Collection.extend({cache:function(t){if("undefined"!=typeof localStorage){var o,i=this,n=this.options.cache_key||this.name||this.cid;if(t)return o=e.map(t,function(e){return e.id||e._id}),this.store.set(n,JSON.stringify(o));if(o=this.store.get(n),e.isNull(o)||e.isEmpty(o))return[];o=JSON.parse(o);var r=new this.model,c=r.options.cache_key||r.name||"model",a=e.map(o,function(t){var o=i.store.get(c+"_"+t);return e.isNull(o)||e.isEmpty(o)?{}:JSON.parse(o)});return a}},store:{get:function(e){return localStorage.getItem(e)},set:function(e,t){return localStorage.setItem(e,t)},check:function(e){return null===localStorage.getItem(e)},clear:function(e){return localStorage.removeItem(e)}}}),c=n.Model.extend({options:{cache_timestamp:!1,cache_exclude:[]},cache:function(t){if("undefined"!=typeof localStorage){var o=this.options.cache_key||this.name||"model";if(t){t[this.idAttribute]&&(o+="_"+t[this.idAttribute]);for(var i in this.options.cache_exclude){var n=this.options.cache_exclude[i];delete t[n]}if(t=JSON.stringify(t),this.options.cache_timestamp){t=btoa(t);var r=Date.now();t=JSON.stringify({data:t,timestamp:r})}return this.store.set(o,t)}this[this.idAttribute]&&(o+="_"+this[this.idAttribute]);var c=this.store.get(o);return e.isNull(c)||e.isEmpty(c)?{}:(c=JSON.parse(c),this.options.cache_timestamp&&(c=atob(c.data),c=JSON.parse(c)),c)}},store:{get:function(e){return localStorage.getItem(e)},set:function(e,t){return localStorage.setItem(e,t)},check:function(e){return null===localStorage.getItem(e)},clear:function(e){return localStorage.removeItem(e)}}});return"object"==typeof window&&"object"==typeof window.document&&(n.Model=c,n.Collection=r,window[n]=n),o});