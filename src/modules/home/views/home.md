[RequireJS]: http://requirejs.org/docs/
[Open-ajax]: http://www.openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification
[services module]: http://drupal.org/project/services
[cache manifest]: http://www.whatwg.org/specs/web-apps/current-work/#offline
[$.couch.db]: http://daleharvey.github.com/jquery.couch.js-docs/symbols/%24.couch.db.html
[Elasticsearch]: http://www.elasticsearch.org/guide/
[jQuery]: http://jquery.org
[microtemplate]: http://ejohn.org/blog/javascript-micro-templating/
[services page]: http://127.0.0.1?q=/admin/structure/services
[your fancy mobile app]: http://127.0.0.1/mobile/
[Resources]: http://127.0.0.1?q=/admin/structure/services/list/rest_api/resources
[Services Tools]: http://drupal.org/project/services_tools
[Services Introspect]: http://drupal.org/project/services_introspect
[couchapp]: https://github.com/couchapp/couchapp
[pollywog couchapp]: http://127.0.0.1:5984/app/_design/pollywog_couch/index.html
[pollywog elasticsearch plugin]: http://localhost:9200/_plugin/pollywog/

# teh pollywog saiz "o hai!"

This is a pollywog app. If you are seeing this page, you probly gotta set some stuff up.

## Wot? Another framework? Sounds dumb.

Pollywog is made for getting cool stuff done, without having to do a bunch of stuff, in a way that is maintainable.

Pollywog saves me time when I want a 1-page app, that loads quick, manages dependencies (even in minification,) has pre-made bindings for the data-layers I use most, keeps my code organized, and provides a view layer.  It's not MVC, but it's kind of similar, and it's not really doing all that much but adding a few little helpers. All the parts are optional, and you can leave out whatever you like (although without [RequireJS], [Open-ajax], the state_manager, the templating engine, and the data-helpers, there really isn't anything left.)

## The Little Guy's Adventure Begins with a Look

This text is produced by the home module, in modules/home/home.js. To edit this view, open modules/home/views/home.md. The template engine understands Markdown and a simple js-like template language. The CSS you are seeing is Boilerplate (reset & media queries) in /main.css with overrides from themes/default/style.css

## Pollywog Loves Hash URLs

You can attach all of your code to hashes. There are 2 types.  The first is a normal hash, and will get inserted into your history. The other are actions or overlays that should not be in your history. The difference between the 2 is an underscore at the beginning. This page is an example that is hooked to the #home hash. See the source of modules/home/home.js to see how it works. The parent or home hash is defined in main.js with a line like this:

Javascript:

    state("home");

This means that if there is not an existing primary hash (no underscore at beginning) then trigger the home hash, which is defined in modules/home/home.js. To add more modules that respond to hash-changes, just add them in the top of main.js, the same way 'modules/home/home.js' is added.


## Form Over Fashion

You are probly gonna want some backend data. There are a few options.

### Chillaxin' on the Drupal-pad

If you have a drupal site, running the [services module], you can use your drupal site as a data-source for a cool little mobile version of your site, complete with a [cache manifest] to make it run at native-app speed, even on a crappy connection. You can modify modules/home/home.js to look like this:

Javascript:

    define([
      "share/jquery",
      "share/open_ajax",
      "share/microtemplate",
      "share/data_drupal",
      "share/spin",
      "share/text!./views/home.htm"
    ], function($, open_ajax, view, data, spinner, v_home) {
      
      /**
       * called when user visits #home
       * @param  {[type]} m original message
       * @param  {[type]} o options - includes params, and lots of other info about state & transition
       */
      open_ajax.subscribe("home.enter", function(m,o){
        spinner.spin($("section").html("").get(0));
        $("title").text("Drupal Works!");
        data.setup(function(err){
          if (!err){
            // first user is you, others are those you have access to
            data.drupal("user.index", {"pagesize" : 1}, function(users){
              $("section").html(view("home/home.htm", v_home, {"user" : users[0]}));
            });
          }else{
            console.error(err);
          }
        });
      });
      
    });

Make your template (modules/home/views/home.htm) look like this:

HTML:

    <% if (user){ %>
      <h1>Oh hai <%= user.name %>! what’s up?</h1>
      <p>I know all kinds a stuff 'bout you, (non-gender-specific) dude:</p>
      <dl>
      <% for (u in user) { %>
        <dt><%= u %></dt>
        <dd><%= user[u] %></dt>
      <% } %>
    </dl>
    <% }else{ %>
      <h1>Not logged in. Go <a href="/user/login">here</a> to fix that.</h1>
    <% } %>

Go setup a REST service endpoint on [services page]. Make the path to endpoint "rest_api" (change this in config/drupal.js.) Turn on "Session authentication". Under the [Resources] tab, make sure at least user.index is turned on. Put this awesome Pollywog app in the webroot of yer webserver, in a folder called "mobile". Now, go to [your fancy mobile app]. Sweet.

The Drupal data-layer uses [Services Introspect] to get info about the installed services. You can use [Services Tools] project, which includes the Services Definition module to find out more about your services and get params, etc. 


### Pollywog likes the Couches
Yup, we do couchdb, direct (you can use pollywog in yer [couchapp]!)  You can modify modules/home/home.js to look like this:

Javascript:

    define([
      "share/jquery",
      "share/open_ajax",
      "share/microtemplate",
      "share/data_couchdb",
      "share/spin",
      "share/text!./views/home.htm"
    ], function($, open_ajax, view, data, spinner, v_home) {
      
      /**
       * called when user visits #home
       * @param  {[type]} m original message
       * @param  {[type]} o options - includes params, and lots of other info about state & transition
       */
      open_ajax.subscribe("home.enter", function(m,o){
        spinner.spin($("section").html("").get(0));
        $("title").text("Couch Works!");
        data.info(function(i){
          $("section").html(view("home/home.htm", v_home, {"db_info": i}));
        });
      });

    });

Make your template (modules/home/views/home.htm) look like this:

HTML:

    <% if (db_info){ %>
      <h1>Oh hai! Yer DB is all Couch-ee</h1>
      <dl>
      <% for (d in db_info){ %>
        <dt><%= d %></dt>
        <dd><%= JSON.stringify(db_info[d]) %></dd>
      <% } %>
      </dl>
    <% }else{ %>
      <h1>No couch to sit on! Is it running? See <a href="/_utils/">here</a>.</h1>
    <% } %>

The API is a simple wrapper around [$.couch.db] but inserts success & error callbacks into options, to be more syntax-compatable with the other pollywog data-layers.  Make sure to customize config/couchdb.js to set your service endpoint up.

To push it into your database, install [couchapp]. Now, create a new couchapp:

    couchapp startapp YOURAPP

Move the src folder (or webroot, if you have built the app) contents into _attachments/ and from YOURAPP folder, type this:

    couchapp push http://127.0.0.1:5984/app

Now, you can visit your very own [pollywog couchapp]!




### Getting all elastic-ee

Elasticsearch works pretty good all by itself (without indexing some other data source), and pollywog has a built-in data module for using it this way. This is a good choice if you need full-text searching and you don't need couchdb app-replication. You can modify modules/home/home.js to look like this:

Javascript:

    /**
     * called when user visits #home
     * @param  {[type]} m original message
     * @param  {[type]} o options - includes params, and lots of other info about state &amp; transition
     */
    open_ajax.subscribe("home.enter", function(m,o){
      spinner.spin($("section").html("").get(0));
      $("title").text("Elastic Works!");

      var query = {
        "query": {
          "bool": {
            "must": [{
              "term": {
                "Actors": "corey"
              }
            }],
            "must_not": [],
            "should": []
          }
        },
        "from": 0,
        "size": 50,
        "sort": [],
        "facets": {}
      };
      data.query(query, function(out){
        console.log("ya got some!", out);
        $("section").html(view('home/home.html', v_home, out.hits));
      });

    });


The API is pretty simple, it includes query() & save(). Also, you can use methods in shared/data_generic.js. There will probly be a more fleshed out API, later on. Either way, you should probly go read about [Elasticsearch]. Make sure to customize config/elastic.js to set your service endpoint.


Elasticsearch will run anything in the plugins/NAME/_site folder as a plugin, so lets copy the pollywog src folder (or webroot, if you have built the app) contents into ELASTICSEARCH-DIR/plugins/pollywog/_site/ and restart elasticsearch. Visit your awesome new [pollywog elasticsearch plugin]!

This code will generate a little elasticsearch index filled with some movies:

    open_ajax.subscribe("generate_elastic_index.enter", function(m,o){
      data.create(function(){
        ['labrynth', 'pirate', 'goonies', 'ghostbusters', 'princess+bride', 'lost+boys', 'top+gun', 'gone+with+wind','shawshank', 'metropolis', 'carrie', 'big+chill'].forEach(function(name){
          $.get('http://www.imdbapi.com/?i=&t=' + name, function(movie){
            movie = JSON.parse(movie);
            var id = movie.ID;
            delete movie.ID;
            delete movie.Response;
            movie.Genre = movie.Genre.split(', ');
            movie.Writer = movie.Writer.split(', ');
            movie.Actors = movie.Actors.split(', ');
            movie.Director = movie.Director.split(', ');
            data.save('movie/' + id, movie);
            $("section").append(movie.Title + ' added.</br>');
          });
        });
      });
    });

plop it into the home module, and visit [pollywog elasticsearch plugin]#generate_elastic_index now, go delete the code when it's done.

The API provides query(), save(), create(), and the functions in data_generic (so you can get('movie/tt0089218') to get Goonies!)


## Show me your guts, little frog

Pollywog is built on the backs of tiny giants. In order to be really super-effective with it, it might help to read about those giants:

* [RequireJS] does all the loading of code & view templates, and manages dependencies when building the minified code, or just rockin' it all uncompressed.
* [jQuery]: you know what this is, right?
* I'm using a modified [microtemplate] for the view-layer, that does some nice text replacement (single-quotes &amp; html-purifying) and has some cute error-handling, which is just a smidge more useful than crappy eval-anon generic errors. I also made 2 changes that utilize requirejs, better: no cache (templates are already cached in requirejs) and disabled inline script-templates (better to load from seperate files.)
* [Open-ajax] is cool for cross-module messaging. I use it in the state_manager, and it's pretty handy for other things, too. Basically, any time you want to tell all the other modules that something happened, publish a message. You can see how to do this in the shared/state_manager.js file.


