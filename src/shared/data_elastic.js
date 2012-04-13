define(['share/settings', 'share/data_generic'], function(settings, data){
  var services = new data(settings.elastic.endpoint + '/' + settings.elastic.index + '/');
  
  /**
   * search elasticsearch index
   * @param  {[type]} query   [description]
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.query = function(query, success, error){
    services.request('_search', 'POST', success, error, query);
  };

  /**
   * save a record in index
   * @param  {[type]} id      TYPE/ID
   * @param  {[type]} record  the object to save
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.save = function(id, record, success, error){
    services.request(id, 'PUT', success, error, record);
  };

  /**
   * Create an index
   * @param  {[type]} success [description]
   * @param  {[type]} error   [description]
   */
  services.create = function(success, error){
    services.put("", {"settings":{"index":{"number_of_shards":"1","number_of_replicas":"1"}}}, success, error);
  };
  
  return services;
 });