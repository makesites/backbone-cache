!function(e,t){var o="undefined"!=typeof APP&&"undefined"!=typeof APP.View,n=o?APP:t,i=n.Model.extend({cache:function(t){if("undefined"!=typeof localStorage){var o=this.options.cache_key||this.name||"model";if(t)return t[this.idAttribute]&&(o+="_"+t[this.idAttribute]),this.store.set(o,JSON.stringify(t));var n=this.store.get(o);return e.isNull(n)||e.isEmpty(n)?{}:JSON.parse(n)}},store:{get:function(e){return localStorage.getItem(e)},set:function(e,t){return localStorage.setItem(e,t)},check:function(e){return null===localStorage.getItem(e)},clear:function(e){return localStorage.removeItem(e)}}}),r=n.Collection.extend({cache:function(t){if("undefined"!=typeof localStorage){var o,n=this,i=this.options.cache_key||this.name||this.cid;if(t)return o=e.map(t,function(e){return e.id||e._id}),this.store.set(i,JSON.stringify(o));if(o=this.store.get(i),e.isNull(o)||e.isEmpty(o))return[];o=JSON.parse(o);var r=new this.model,c=r.options.cache_key||r.name||"model",u=e.map(o,function(t){var o=n.store.get(c+"_"+t);return e.isNull(o)||e.isEmpty(o)?{}:JSON.parse(o)});return u}},store:{get:function(e){return localStorage.getItem(e)},set:function(e,t){return localStorage.setItem(e,t)},check:function(e){return null===localStorage.getItem(e)},clear:function(e){return localStorage.removeItem(e)}}}),c=n.View.extend({});"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=n:"function"==typeof define&&define.amd&&define([],function(){return n}),"object"==typeof window&&"object"==typeof window.document&&(n.Model=i,n.Collection=r,n.View=c,window[n]=n)}(this._,this.Backbone);