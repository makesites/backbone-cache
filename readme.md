##Backbone Cache

A uniform approach to file caching control for backbone.js apps. 


## Install 

Using Bower: 
```
bower install backbone.cache
```


## Usage

The plugin will use either the Filesystem API or Phonegap's File API where available for file caching. For data it will save JSON strings using localStorage. 

If [backbone.app](http://github.com/makesites/backbone-app) is not available this extension replaces the default Model/Collection. To initiate simply include the ```cache``` option: 

```
app.session = new Backbone.Model({
    options: {
        cache: true
    }
});
```

## Options

Each model or collection uses the option ```cache``` to initiate caching. The values of this options define the plugin's behaviour. 

* **data**: String, it will only cache the data
* **png**: Array, it will cache specific file formats, in this case .png images
* **true**: Boolean, it will cache everything possible


## Credits

Created by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)

Released under the [MIT license](http://makesites.org/licenses/MIT)

