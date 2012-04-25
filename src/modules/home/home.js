define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/highlight', // totes optional, just for code examples
  
  'share/text!./views/home.md'


], function($, open_ajax, view, highlight, v_home) {
  
  /**
   * called when user visits #home
   * @param  {[type]} m original message
   * @param  {[type]} o options - includes params, and lots of other info about state &amp; transition
   */
  open_ajax.subscribe('home.enter', function(m,o){
    $('title').text("Home");
    $('section').html(view(v_home, false, true));
    highlight();
  });

});
