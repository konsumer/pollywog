// use drupal services, easily

define(['share/jquery','share/settings'], function($, settings){
  var user;

  var services = {
    // your services REST endpoint - in phonegap, this will be the remote URL
    // configure it in config/data.js
    'endpoint' : settings.drupal.endpoint,

    'request': function(url, type, success, error, data){
      success = success || function(data){ console.log('ajax success:', data); };
      error = error || function(jqXHR, textStatus, errorThrown){ console.error('ajax error:', jqXHR); };
      var options={
        contentType: 'application/json',
        url: services.endpoint + url + '.json',
        type: type,
        success: success,
        error:error
      };
      if (data){
        options.data = JSON.stringify(data);
      }
      return $.ajax(options);
    },
    
    'get': function(url, success, error){
      return services.request(url, 'GET', success, error);
    },
    
    'post': function(url, data, success, error){
      return services.request(url, 'POST', success, error, data);
    },
    
    'put': function(url, data, success, error){
      return services.request(url, 'PUT', success, error, data);
    },
    
    'delete': function(url, success, error){
      return services.request(url, 'DELETE', success, error);
    },

    /**
     * load node
     * @param  {Integer}   nid     node ID
     * @param  {Function} callback function to be called on node
     */
    node: function(nid, callback){
      return services.get('node/' + nid, callback);
    },

    /**
     * get currently logged-in user from server
     * @param  {Function} callback [called on user-object, or FALSE, if no user loaded
     */
    user: function(){
      callback = callback || function(user){ console.log('current user', user); };
      if (user){
        callback(user);
      }else{
        data.get('user', function(users){
          if (users.length){
            user = users[0];
            callback(user);
          }else{
            callback(false);
          }
        });
      }
    },

    /**
     * logout of Drupal
     * @param  {Function} callback [description]
     */
    user_logout: function(){
      user = undefined;
      return data.post('user/logout',{}, callback);
    },

    /**
     * login to Drupal
     * @param  {String}   user     drupal username
     * @param  {String}   password drupal password
     * @param  {Function} callback function to be called on user object
     */
    user_login: function(user, password, callback){
      callback = callback || function(user){ console.log('current user', user); };
      return services.post('user/login', {username: user, password:password}, function(u){
        user = u;
        callback(u);
      });
    }
  };

  // pre-load user data, if they are already logged-in
  services.user();

  return services;
});
