/**
 * Wrapper around $.couch that allows success/error params, for readability
 */
define(['share/settings', 'share/order!share/jquery', 'share/order!share/jquery.couch'], function(settings, $){
  $.couch.urlPrefix = settings.couchdb.endpoint;
  var $db = $.couch.db(settings.couchdb.database);

  var services={};

  /**
   * Fetch all the design docs with an index.html, options parameter expects an eachApp field which is a callback called on each app found.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.allApps = function(success, error){
    return $db.allApps({"success":success, "error":error});
  };

  /**
   * Fetch all the design docs in this db
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.allDesignDocs = function(success, error){
    return $db.allDesignDocs({"success":success, "error":error});
  };

  /**
   * Fetch all the docs in this db, you can specify an array of keys to fetch by passing the keys field in the options parameter.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.allDocs = function(success, error){
    return $db.allDocs({"success":success, "error":error});
  };

  /**
   * Remove a set of documents
   * @param  {[type]} docs    [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.bulkRemove = function(docs, success, error){
    return $db.bulkRemove(docs, {"success":success, "error":error});

  };

  /**
   * Save a list of documents
   * @param  {[type]} docs    [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.bulkSave = function(docs, success, error){
    return $db.bulkSave(docs, {"success":success, "error":error});

  };

  /**
   * Request compaction of the specified database.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.compact = function(success, error){
    return $db.compact({"success":success, "error":error});

  };

  /**
   * Compacts the view indexes associated with the specified design document. You can use this in place of the full database compaction if you know a specific set of view indexes have been affected by a recent database change.
   * @param  {[type]} groupname [description]
   * @param  {[type]} success   [description]
   * @param  {[type]} error     [description]
   */
  services.compactView = function(groupname, success, error){
    return $db.compactView(groupname, {"success":success, "error":error});

  };

  /**
   * Create a new database
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.create = function(success, error){
    return $db.create({"success":success, "error":error});

  };

  /**
   * Deletes the specified database, and all the documents and attachments contained within it.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.drop = function(success, error){
    return $db.drop({"success":success, "error":error});

  };

  /**
   * Fetch an arbitrary CouchDB database property
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.getDbProperty = function(success, error){
    return $db.getDbProperty({"success":success, "error":error});

  };

  /**
   * Gets information about the specified database.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.info = function(success, error){
    return $db.info({"success":success, "error":error});

  };

  /**
   * Fetch a _list view output, you can specify a list of keys in the options object to recieve only those keys.
   * @param  {[type]} list    [description]
   * @param  {[type]} view    [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.list = function(list, view, success, error){
    return $db.list(list, view, {"success":success, "error":error});

  };

  /**
   * Returns the specified doc from the specified db.
   * @param  {[type]} docId   [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.openDoc = function(docId, success, error){
    return $db.openDoc(docId, {"success":success, "error":error});

  };

  /**
   * Creates (and executes) a temporary view based on the view function supplied in the JSON request.
   * @param  {[type]} mapFun    [description]
   * @param  {[type]} reduceFun [description]
   * @param  {[type]} success   [description]
   * @param  {[type]} error     [description]
   * @param  {[type]} language  [description]
   */
  services.query = function(mapFun, reduceFun, success, error, language){
    return $db.query(mapFun, reduceFun, {"success":success, "error":error});

  };

  /**
   * Deletes the specified document from the database. You must supply the current (latest) revision and id of the document to delete eg removeDoc({_id:"mydoc", _rev: "1-2345"})
   * @param  {[type]} doc     [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.removeDoc = function(doc, success, error){
    return $db.removeDoc(doc, {"success":success, "error":error});

  };

  /**
   * Create a new document in the specified database, using the supplied JSON document structure. If the JSON structure includes the _id field, then the document will be created with the specified document ID. If the _id field is not specified, a new unique ID will be generated.
   * @param  {[type]} doc     [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.saveDoc = function(doc, success, error){
    return $db.saveDoc(doc, {"success":success, "error":error});

  };

  /**
   * Set an arbitrary CouchDB database property
   * @param {[type]} propName  [description]
   * @param {[type]} propValue [description]
   * @param {[type]} success   [description]
   * @param {[type]} error     [description]
   */
  services.setDbProperty = function(propName, propValue, success, error){
    return $db.setDbProperty(propName, propValue, {"success":success, "error":error});

  };

  /**
   * Executes the specified view-name from the specified design-doc design document, you can specify a list of keys in the options object to recieve only those keys.
   * @param  {[type]} name    [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.view = function(name, success, error){
    return $db.view(name, {"success":success, "error":error});

  };

  /**
   * Cleans up the cached view output on disk for a given view.
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.viewCleanup = function(success, error){
    return $db.viewCleanup({"success":success, "error":error});

  };
  
  services.changes = $db.changes;

  return services;
});