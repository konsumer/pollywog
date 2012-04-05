define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/highlight', // totes optional
  
  'share/text!./views/home.md'


], function($, open_ajax, view, highlight, v_home) {
  open_ajax.subscribe('home.enter', function(m,o){
    $('title').text("Home");
    $('section').html(view('home/home.md', v_home));
    highlight();
  });

});
