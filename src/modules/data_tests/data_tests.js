define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/data_couchdb',
  'share/spin',

  'share/text!./views/couch.htm',
  'share/text!./views/elastic.htm'


], function($, open_ajax, view, data, spinner, v_home) {
  
  open_ajax.subscribe('data_test.enter', function(m,o){
    spinner.spin($('section').html('').get(0));
    $('title').text("Couch Test");
    data.info(function(i){
      console.log("yer db!", i);
      $("section").html(view(v_home, {"db_info": i}));
    });
  });

});