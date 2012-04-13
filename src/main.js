/**
 * @file
 * Entry-point for deployment target
 */

require({
  'paths':{
    'modules': './modules/', // application code organized into modules belongs in here
    'share': './shared', // shared code for this target
    'config': './config'
  }
},

[
  'share/state_manager',
  'share/jquery',
  'share/os',
  'share/settings',
  
  // load target modules here, no need to add them to your function callback, below.
  'modules/home/home.js',

  // these are testers for the data-backends - they overwrite home.enter!
  // 'modules/tests/drupal.js',
  // 'modules/tests/couch.js',
  // 'modules/tests/elastic.js'
],

function(state, $, os, settings){
  // called when DOM & require modules are loaded.
  require.ready(function(){

    // initial page, if hash is not set load initial
    state('home');
  });
});