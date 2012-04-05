// use drupal services, easily

define(['share/settings', 'share/data_generic', 'share/open_ajax'], function(settings, data, open_ajax){
  var services = new data(settings.drupal.endpoint);

  // attempt to get definition from http://drupal.org/project/services_tools endpoint
  
  services.setup = function(callback, reload){
    // use require's cache/return to get a nice local copy
    // var services = require('share/data_drupal');

    // already setup
    if (services.drupal && !reload){
      callback();
    }

    var method_map = {
      'retrieve':'GET',
      'update':'PUT',
      'delete':'DELETE',
      'index':'GET',
      'create':'POST',
      'actions':'POST',
      'targeted_actions':'POST',
      'relationships':'GET'
    };

    services.get('definition.json', function(def){
      if (def.status && def.status == 404){
        console.log('You must enable services_tools/service_definition for a map of functions. You will need to call services, direct with data.get, data.post, etc.');
        callback();
      }else{
        services.drupal = {};
        var module, resource, r, args, a, arg, data, ua, param;
        if (def.resource_details){
          for (module in def.resource_details){
            services.drupal[module]={};
            resource = def.resource_details[module];
            for (r in resource){
              console.log(module + '.' + r, resource[r]);
              fn='';
              if (r != 'actions' && r != 'relationships' && r != 'targeted_actions'){
                args=[];
                data=undefined;
                ua='';
                param=[];
                for(a in resource[r].args){
                  arg = resource[r].args[a];
                  args.push(arg.name);
                  if (arg.source == 'data'){
                    data = arg.name;
                  }
                  if (arg.source.path){
                    ua += "/' + "+ arg.name + " + '";
                  }
                  if (arg.source.param){
                    param.push(arg.source.param);
                  }
                }
                fn = "  var services=require('share/data_drupal');\n";
                fn += "  var url='"+module+ua+".json';\n";
                fn += "  var type='"+method_map[r]+"';\n";

                if (!data){
                  if (args.length && ua === ''){
                    fn += "  var data={};\n";
                    fn += "  var fa = arguments;\n";
                    fn += "  ['" + param.join("', '") + "'].forEach(function(a, i){  if (fa[i]) { data[a] = fa[i]; } });\n";
                    fn += "  services.request(url, type, success, error, data);\n";
                  }else{
                    fn += "  services.request(url, type, success, error);";
                  }
                }else{
                  fn += "  services.request(url, type, success, error, "+data+");";
                }

                
              }

              args.push('success');
              args.push('error');
              console.log(module + '.' + r, '= function('+args.join(', ')+'){\n'+fn+'\n}');


            }
          }
          callback();
        }else{
          console.log("Your version of services_tools doesn't include extended info. see http://drupal.org/node/1515614");
        }
      }
    });
  };
  return services;
});
