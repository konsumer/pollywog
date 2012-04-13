define([
  "share/jquery",
  "share/open_ajax",
  "share/microtemplate",
  "share/data_drupal",
  "share/spin",
  "share/text!./views/drupal.htm"
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