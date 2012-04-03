/**
 * Home module
 */

define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/prettify', // totes optional.
  'share/text!./views/home.tpl'
], function($, open_ajax, view, prettify, t_home) {

  /**
   * called when user visits #home
   * @param  {[type]} m original message
   * @param  {[type]} o options - includes params, and lots of other info about state & transition
   */
  open_ajax.subscribe('home.enter', function(m,o){
    $('title').text("Home");
    $('section').html(view(t_home));
    
    // optional
    prettify.prettyPrint();
  });

});
