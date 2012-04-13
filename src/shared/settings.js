// loads files in config dir
define([
	'config/app',
	'config/drupal',
	'config/couchdb',
	'config/elastic'
], function(cfg_app, cfg_drupal, cfg_couchdb, cfg_elastic) {
  settings = {};
	
  settings.app = cfg_app;
  settings.drupal = cfg_drupal;
  settings.couchdb = cfg_couchdb;
  settings.elastic = cfg_elastic;

  return settings;
});
