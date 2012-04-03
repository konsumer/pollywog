// loads files in config dir
define([
	'config/drupal',
	'config/couchdb'
], function(cfg_drupal, cfg_couchdb) {
  settings = {};

  settings.drupal = cfg_drupal;
  settings.couchdb = cfg_couchdb;

  return settings;
});
