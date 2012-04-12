define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/data_drupal',
  'share/spin',

  'share/text!./views/drupal.htm',
  'share/text!./views/couch.htm',
  'share/text!./views/elastic.htm'


], function($, open_ajax, view, data, spinner, v_drupal, v_couch, v_elastic) {
  
  open_ajax.subscribe('data_test.enter', function(m,o){
    $('title').text("Drupal Test");
    spinner.spin($('section').html('').get(0));
    data.setup(function(err){
      if (!err){
        // first user is you, others are those you have access to
        data.drupal('user.index', {pagesize:1}, function(users){
          $('section').html(view('data_tests/drupal.htm', v_drupal, {user:users[0]}));
        });
      }else{
        console.error(err);
      }
    });
  });

});