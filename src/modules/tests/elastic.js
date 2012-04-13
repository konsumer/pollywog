define([
  "share/jquery",
  "share/open_ajax",
  "share/microtemplate",
  "share/data_elastic",
  "share/spin",
  "share/text!./views/elastic.htm"
], function($, open_ajax, view, data, spinner, v_home) {

  open_ajax.subscribe("generate_elastic_index.enter", function(m,o){
    data.create(function(){
      ["labrynth", "goonies", "ghostbusters", "princess+bride", "lost+boys", "top+gun", "gone+with+wind","shawshank", "metropolis", "carrie", "big+chill"].forEach(function(name){
        $.get("http://www.imdbapi.com/?t=" + name, function(movie){
          movie = JSON.parse(movie);
          var id = movie.ID;
          delete movie.ID;
          delete movie.Response;
          movie.Genre = movie.Genre.split(", ");
          movie.Writer = movie.Writer.split(", ");
          movie.Actors = movie.Actors.split(", ");
          movie.Director = movie.Director.split(", ");
          data.save("movie/" + id, movie);
          $("section").append(movie.Title + " added.</br>");
        });
      });
    });
  });


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
  
});