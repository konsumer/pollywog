/**
 * @file
 * Entry-point for deployment target
 */

require({
  'paths':{
    'modules': './modules/', // application code organized into modules belongs in here
    'share': './shared', // shared code for this target
    'views': './shared/views',  // shared views for this target
    'config': './config'
  }
},

[
  'share/state_manager',
  'share/jquery',
  'share/os',
  'share/settings',

  // for testing in console
  'share/data_drupal',
  
  // load target modules here, no need to add them to your function callback, below.
  'modules/home/home.js'
],

function(state, $, os, settings){
  // setup target info
  if(os.iphone || os.ipod){
    $('head').prepend('<meta name="viewport" content="width=480, user-scalable=no"/>');
  }else if(os.ipad){
    $('head').prepend('<meta name="viewport" content="width=1024, user-scalable=no"/>');
  }

  // remove default iOS behavior on window when doing touch events
  if (document.hasOwnProperty('ontouchstart'))
    { $(window).bind('touchmove.preventIOSdefault',function(e) { e.preventDefault(); }); }
  $(document).bind('touchmove', function(e) {e.preventDefault();} );
  
  // called when DOM & require modules are loaded.
  require.ready(function(){

    // initial page, if hash is not set load initial
    state('home');
  });
});