// use drupal services, easily

define(['share/settings', 'share/data_generic', 'share/open_ajax'], function(settings, data, open_ajax){
  var services = new data(settings.drupal.endpoint);

  var functionCache={};

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
