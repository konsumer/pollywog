[RequireJS]: http://requirejs.org/docs/
[Open-ajax]: http://www.openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification
[services module]: http://drupal.org/project/services
[cache manifest]: http://www.whatwg.org/specs/web-apps/current-work/#offline
[$.couch.db]: http://daleharvey.github.com/jquery.couch.js-docs/symbols/%24.couch.db.html
[Elasticsearch]: http://www.elasticsearch.org/guide/
[jQuery]: http://jquery.org
[microtemplate]: http://ejohn.org/blog/javascript-micro-templating/

# teh pollywog saiz "o hai!"

This is a pollywog app. If you are seeing this page, you probly gotta set some stuff up.

## Wot? Another framework? Sounds dumb.

Pollywog saves me time when I want a 1-page app, that loads quick, manages dependencies (even in minification,) has pre-made bindings for the data-lalyers I use most, keeps my code organized, and provides a view layer.  It's not MVC, but it's kind of similar, and it's not really doing all that much but adding a few little helpers. All the parts are optional, and you can leave out whatever you like (although without [RequireJS], [Open-ajax], the state_manager, the templating engine, and the data-helpers, there really isn't anything left.)

## The Little Guy's Adventure Begins with a Look

This text is produced by the home module, in modules/home/home.js. To edit this view, open modules/home/views/home.md. The template engine understands Markdown and a simple js-like template language. The CSS you are seeing is Boilerplate (reset & media queries) in /main.css with overrides from themes/default/style.css

## Pollywog Loves Hash URLs

You can attach all of your code to hashes. There are 2 types.  The first is a normal hash, and will get inserted into your history. The other are actions or overlays that should not be in your history. The difference between the 2 is an underscore at the beginning. This page is an example that is hooked to the #home hash. See the source of modules/home/home.js to see how it works. The parent or home hash is defined in main.js with a line like this:

`state('home');`

This means that if there is not an existing primary hash (no underscore at beginning) then trigger the home hash, which is defined in modules/home/home.js. To add more modules that respond to hash-changes, just add them in the top of main.js, the same way 'modules/home/home.js' is added.


## Form Over Fashion

You are probly gonna want some backend data. There are a few options.

### Chillaxin' on the Drupal-pad

If you have a drupal site, running the [services module], you can use your drupal site as a data-source for your cool little mobile version of your site, complete with a [cache manifest] to make it run at native-app speed, even on a crappy connection. You can modify modules/home/home.js to look like this:

Javascript:

    define([
      "share/jquery",
      "share/open_ajax",
      "share/microtemplate",
      "share/data_drupal",
      "share/text!./views/home.tpl"
    ], function($, open_ajax, view, data, t_home) {
      
      /**
       * called when user visits #home
       * @param  {[type]} m original message
       * @param  {[type]} o options - includes params, and lots of other info about state & transition
       */
      open_ajax.subscribe("home.enter", function(m,o){
      	data.user(function(u){
      	  console.log("yer user!", u);
      	  $("section").html(view(t_home, {"user": u}));
      	});
      });
    });


Now, your template has access to the "user" variable, which is "undefined" or it"s your currently logged-in drupal user! See the "shared/data_drupal.js" file to get an idea of what other neat things you can do, and don't be scared to extend it however you see fit, I dare you! Make sure to customize config/drupal.js to set your service endpoint.

### Pollywog likes the Couches
Yup, we do couchdb, direct (you can use pollywog in yer couchapp!)  You can modify modules/home/home.js to look like this:

Javascript:

    define([
      "share/jquery",
      "share/open_ajax",
      "share/microtemplate",
      "share/data_couchdb",
      "share/text!./views/home.tpl"
    ], function($, open_ajax, view, data, t_home) {
      
      /**
       * called when user visits #home
       * @param  {[type]} m original message
       * @param  {[type]} o options - includes params, and lots of other info about state &amp; transition
       */
      open_ajax.subscribe("home.enter", function(m,o){
        data.info(function(i){
          console.log("yer db!", i);
          $("section").html(view(t_home, {"db_info": i}));
        });
      });
    });


The API mimics [$.couch.db] but inserts success & error callbacks into options, to be more syntax-compatable with the other pollywog data-layers.  Make sure to customize config/couchdb.js to set your service endpoint.

### Getting all elastic-ee

Elasticsearch works pretty good all by itself (without indexing some other data source), and pollywog has a built-in data module for using it this way. This is a good choice if you need full-text searching and you don't need couchdb app-replication. You can modify modules/home/home.js to look like this:

Javascript:

    define([
      "share/jquery",
      "share/open_ajax",
      "share/microtemplate",
      "share/data_elastic",
      "share/text!./views/home.tpl"
    ], function($, open_ajax, view, data, t_home) {
      
      /**
       * called when user visits #home
       * @param  {[type]} m original message
       * @param  {[type]} o options - includes params, and lots of other info about state &amp; transition
       */
      open_ajax.subscribe("home.enter", function(m,o){
        var query = {
          "query": {
            "bool": {
              "must": [
                {
                  "term": {
                    "title": "pirate"
                  }
                },
                {
                  "term": {
                    "type": "movie"
                  }
                }
              ]
            }
          },
          "from": 0,
          "size": 10,
          "sort": [],
          "facets": {}
        };

        data.query(query, function(out){
          console.log("ya got some!", out);
          $("section").html(view(t_home, out));
        });

      });
    });


The API is pretty simple, it includes query() & some REST functions to do other stuff. There will probly be a more fleshed out API, later on. Either way, you should probly go read about [Elasticsearch]. Make sure to customize config/elastic.js to set your service endpoint.

## Tell Me Your Big Secrets, Little Frog

Pollywog is built on the backs of tiny giants. In order to be really super-effective with it, it might help to read about those giants:

* [RequireJS] does all the loading of code & view templates, and manages dependencies when building the minified code, or just rockin' it all uncompressed.
* [jQuery]: you know what this is, right?
* I'm using a modified [microtemplate] for the view-layer, that does some nice text replacement (single-quotes &amp; html-purifying) and has some cute error-handling, which is just a smidge more useful than crappy eval-anon generic errors. I also made 2 changes that utilize requirejs, better: no cache (templates are already cached in requirejs) and disabled inline script-templates (better to load from seperate files.)
* [Open-ajax] is cool for cross-module messaging. I use it in the state_manager, and it's pretty handy for other things, too. Basically, any time you want to tell all the other modules that something happened, publish a message. You can see how to do this in the shared/state_manager.js file.


