// use drupal services, easily

define(['share/settings', 'share/data_generic', 'share/open_ajax'], function(settings, data, open_ajax){
  var services = new data(settings.drupal.endpoint);

  services.setup = function(callback, reload){
    callback = callback || function(err){};
    reload = reload || false;
    if ( services.drupal !== undefined && !reload ){
      callback();
      return;
    }
    services.get('introspect.json', function(introspect){
      var args, fn;
      for(var s in introspect){
        args=[];
        fn ='var services=require("share/data_drupal");';

      }
    }, function(){
      callback("You need to install the services_introspect module, make sure you have the correct permissions, and ensure that config/drupal.js is setup.");
    });
  };

  /**
   * attempt to get definition from http://drupal.org/project/services_tools endpoint
   * @param  {Function} callback called when complete, or on error with message
   * @param  {Boolean}   reload   [description]
   * @param  {Boolean}   getInfo   [description]

  var method_map = {
    'retrieve':'GET',
    'update':'PUT',
    'delete':'DELETE',
    'index':'GET',
    'create':'POST',
    'actions':'POST',
    'targeted_actions':'POST',
    'relationships':'GET',
    'file':'POST' // not sure about this. taxonomy_vocabulary.file uses it.
  };
  services.setup = function(callback, reload){
    callback = callback || function(err){};
    reload = reload || false;

    // already setup
    if ( services.drupal !== undefined && !reload ){
      callback();
      return;
    }
    services.get('definition.json', function(def){
      var actualFunction = function(module, method, type){
        var hmethod = method_map[method];
        return function(){
          var params, in_url=[], data, success, error;
          var args = Array.prototype.slice.call(arguments);
          // have to guess stuff based on type, because I don't have server-side info
          args.forEach(function(a){
            if (a.constructor == Function.prototype.constructor){
              if(success){
                error = a;
              }else{
                success = a;
              }
            }else if (a.constructor == Object.prototype.constructor){
              // params are more likely for GET, data for others: use both to set both, more-likely one, first
              if (hmethod == 'GET'){
                if (params){
                  data = a;
                }else{
                  params = a;
                }
              }else{
                if (data){
                  params = a;
                }else{
                  data = a;
                }
              }
            }else{
              in_url = a;
            }
          });
          var url = module + ( (type=='operation') ? '' : '/' + method) + in_url.join('/') + '.json';
          if (params){
            url += '?' + Object.keys(params).map(function(p){ return encodeURI(p) + '=' + encodeURI(params[p]); }).join('&');
          }
          services.request(url, hmethod, success, error, data);
        };
      };
      if (def.status && def.status == 404){
        callback('You must enable services_tools/service_definition for a map of functions. This could also be caused by not editing config/drupal.js');
      }else{
        services.drupal = {};
        // http://augmentjs.com/ will add Object.keys & forEach, if pollyfill needed
        Object.keys(def.resources).forEach(function(module){
          services.drupal[module]={};
          try{ Object.keys(def.resources[module].actions).forEach(function(method){ services.drupal[module][method] = actualFunction(module, method, 'action'); }); }catch(e){}
          try{ Object.keys(def.resources[module].operations).forEach(function(method){ services.drupal[module][method] = actualFunction(module, method, 'operation'); }); }catch(e){}
        });
        callback();
      }
    });
  };
  */

  // do initial setup
  services.setup(function(err){
    console.log('services', services.drupal);
  });

  return services;
});

