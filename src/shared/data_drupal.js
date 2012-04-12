// use drupal services, easily

define(['share/settings', 'share/data_generic'], function(settings, data){
  var services = new data(settings.drupal.endpoint);

  /**
   * Gets initial info from services_introspect for future callbacks
   * @param  {Function} callback    On error, first param is string of message
   * @param  {Boolean}   forceReload use cacche or force-reload. False, by default.
   */
  services.setup = function(callback, forceReload){
    callback = callback || function(err){};
    if (services.resources !== undefined && !forceReload){
      callback();
    }else{
      services.get('introspect.json', function(introspect){
        services.resources = introspect;
        callback();
      }, function(){
        callback("You need to install the services_introspect module: http://drupal.org/project/services_introspect, also make sure you have the correct permissions and ensure that config/drupal.js is setup.");
      });
    }
  };

  /**
   * Make a Drupal Services request
   * @param  {[type]} name    Callback name, like users.index.  Use services_tools (definition) module to get more info
   * @param  {Object} params  Parameters, keyed by their name in the service. Use services_tools (definition) module to get more info
   * @param  {Function} success success-callback
   * @param  {Function} error   error-callback
   */
  services.drupal = function(name, params, success, error){
    var i; // generic iterator
    var info = services.resources[name];
    console.log('service', info);
    var url = info.url;
    var data = {};

    // only know how to deal with one data-item, this will leave the last set
    for (i in info.args['data']){
      if (params[i] !== undefined){
        data = params[i];
      }
    }

    for (i in info.args['path']){
      if (params[i] !== undefined){
         url += '/' + params[i];
         delete params[i];
      }
    }

    url += '.json';

    var p=[];
    for (i in info.args['param']){
      if (params[i] !== undefined){
        p.push(encodeURI(i) + '=' + encodeURI(params[i]));
      }
    }

    if (p.length > 0){
      url += '?' + p.join('&');
    }

    services.request(url, info.method, success, error, data);
  };

  return services;
});
