// loads files in config dir
define([
	'config/app',
	'config/drupal',
	'config/couchdb'
], function(cfg_app, cfg_drupal, cfg_couchdb) {
  settings = {};
	
  settings.app = cfg_app;
  settings.drupal = cfg_drupal;
  settings.couchdb = cfg_couchdb;

  return settings;
});
