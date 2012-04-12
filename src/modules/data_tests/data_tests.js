define([
  'share/jquery',
  'share/open_ajax',
  'share/microtemplate',
  'share/data_drupal',
  'share/text!share/views/spinner.tpl',
  'share/text!./views/drupal.htm',
  'share/text!./views/couch.htm',
  'share/text!./views/elastic.htm'


], function($, open_ajax, view, data, v_spinner, v_drupal, v_couch, v_elastic) {
  
  open_ajax.subscribe('data_drupal.enter', function(m,o){
    $('title').text("Drupal Test");
    $('section').html(v_spinner);
    
    data.setup(function(err){
      if (!err){
        data.drupal('user.index')(function(users){
          console.log('users', users);
          $('section').html(view('data_tests/drupal.htm', v_drupal, {user:users[0]}));
        });
      }else{
        console.error(err);
      }
    });
  });

  open_ajax.subscribe('data_couch.enter', function(m,o){
    
  });

  open_ajax.subscribe('data_elastic.enter', function(m,o){
    
  });

});