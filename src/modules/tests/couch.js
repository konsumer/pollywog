define([
  "share/jquery",
  "share/open_ajax",
  "share/microtemplate",
  "share/data_couchdb",
  "share/spin",
  "share/text!./views/couch.htm"
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