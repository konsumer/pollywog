<h1>pollywog saiz "o hai!"</h1>
<p>This is a pollywog app. If you are seeing this page, you probly gotta set some stuff up.</p>

<h2 title="theming pollywog">The Little Guy's Adventure Begins with a Look</h2>
<p>This text is produced by the home module, in modules/home/home.js. To edit this view, open modules/home/views/home.tpl. The CSS you are seeing is Boilerplate (reset &amp; media queries) in /main.css with overrides from themes/default/style.css</p>

<h2 title="data">Form Over Fashion</h2>
<p>You are probly gonna want some backend data. There are a few options.</p>

<h3 title="using drupal services">Chillaxin' on the Drupal-pad</h3>
<p>If you have a drupal site, running the <a href="http://drupal.org/project/services">services module</a>, you can modify modules/home/home.js to look like this:</p>

<pre class="prettyprint"><code class="language-javascript">define([
  "share/jquery",
  "share/open_ajax",
  "share/microtemplate",
  "share/data_drupal",
  "share/text!./views/home.tpl"
], function($, open_ajax, view, data, t_home) {
  
  /**
   * called when user visits #home
   * @param  {[type]} m original message
   * @param  {[type]} o options - includes params, and lots of other info about state &amp; transition
   */
  open_ajax.subscribe("home.enter", function(m,o){
  	data.user(function(u){
  	  console.log("yer user!", u);
  	  $("section").html(view(t_home, {"user": u}));
  	});
  });
});</code></pre>

<p>Now, your template has access to the "user" variable, which is "undefined" or it"s your currently logged-in drupal user! See the "shared/data_drupal.js" file to get an idea of what other neat things you can do, and don't be scared to extend it however you see fit, I dare you! Make sure to customize config/drupal.js to set your service endpoint.</p>

<h3 title="using couchdb with pollywog">Pollywog likes the Couches</h3>
<p>Yup, we do couchdb, direct (you can use pollywog in yer couchapp!)  You can modify modules/home/home.js to look like this:</p>

<pre class="prettyprint"><code class="language-javascript">define([
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
});</code></pre>

<p>The API mimics <a href="http://daleharvey.github.com/jquery.couch.js-docs/symbols/%24.couch.db.html">$.couch.db</a> but inserts success &amp; error callbacks into options, to be more syntax-compatable with the other pollywog data-layers.  Make sure to customize config/couchdb.js to set your service endpoint.</p>

<h3 title="using elastic search as a data-source">Getting all elastic-ee</h3>
<p>Elasticsearch works pretty good all by itself (without indexing some other data source), and pollywog has a built-in data module for using it this way. This is a good choice if you need full-text searching and you don't need couchdb app-replication. You can modify modules/home/home.js to look like this:</p>

<pre class="prettyprint"><code class="language-javascript">define([
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
});</code></pre>
<p>The API is pretty simple, it includes query() &amp; some REST functions to do other stuff. There will probly be a more fleshed out API, later on. Either way, you should probly go <a href="http://www.elasticsearch.org/guide/">read about elasticsearch</a>. Make sure to customize config/elastic.js to set your service endpoint.</p>

<h2 title="libraries used in pollywog">Tell Me Your Big Secrets, Little Frog</h2>
<p>Pollywog is built on the backs of tiny giants. In order to be really super-effective with it, it might help to ready about those giants:</p>
<ul>
  <li><a href="http://requirejs.org/docs/">RequireJS</a> does all the loading of code &amp; view templates, and manages dependencies when building the minified code, or just rockin' it all uncompressed.</li>
  <li><a href="http://jquery.org">jQuery</a>: you know what this is, right?</li>
  <li>I'm using a modified <a href="http://ejohn.org/blog/javascript-micro-templating/">microtemplate</a> for the view-layer, that does some nice text replacement (single-quotes &amp; html-purifying) and has some cute error-handling, which is just a smidge more useful than crappy eval-anon generic errors. I also made 2 changes that utilize requirejs, better: no cache (templates are already cached in requirejs) and disabled inline script-templates (better to laod from seperate files.)</li>
  <li><a href="http://www.openajax.org/member/wiki/OpenAjax_Hub_2.0_Specification">Open-ajax</a> is cool for cross-module messaging. I use it in the state_manager, and it's pretty handy for other things, too.</li>
</ul>

