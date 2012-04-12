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

  services.getFunction = function(name){
    try{
      var info = services.resources[name];
      var fn = "";
      var args=['success', 'error'];
      var a;
      var u=[];
      var p=[];

      // only 1 data-param handled
      if (info.args['data'].length !== undefined && info.args['data'].length > 0){
        args.push('data');
      }
      
      for (a in info.args.path){
        args.push(a);
        u.push(a);
      }
      
      if (u.length > 0){
        info.url += "'+" + u.join("+ '/' +") + "+'";
      }
      info.url += '.json';

      for (a in info.args.param){
        args.push(a);
        p.push(a);
      }

      fn += "  var url='" + info.url + "';\n";
      fn += "  var data;\n";
      fn += "  if (!data) data={" + p.map(function(i){ return i + ':' + i; }).join(',') + "};\n";
      fn += "  for (d in data){\n";
      fn += "    if (data[d]===undefined){\n";
      fn += "      delete(data[d]);\n";
      fn += "    }else if(typeof(data[d]) == 'function'){\n";
      fn += "      if (success) { error=data[d]; }else{ success=data[d]; }\n";
      fn += "      delete(data[d]);\n";
      fn += "    }\n";
      fn += "  }\n";
      fn += "  require('share/data_drupal').request(url, '" + info.method + "', success, error, data);\n";
      
      return [args, fn];
    }catch(e){
      // services not setup
      console.error('service error', name, e);
    }
  };

  services.drupal = function(name){
    fn = services.getFunction(name);
    return (new Function(fn[0].join(','), fn[1]));
  };

  return services;
});

