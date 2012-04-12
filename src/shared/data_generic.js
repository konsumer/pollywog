/**
 * Generic interface common to REST/json interfaces. Extend as needed.
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
define(['share/jquery'], function($){
  var data = function(endpoint_prefix){
    this.endpoint_prefix = endpoint_prefix;
  };

  data.prototype.request = function(url, type, success, error, data, ajaxSettings){
    // re-arrange params, if data is really the success callback (like for GETs)
    if (typeof(data)=='function'){
      success=data;
      error=success;
      data=error;
    }
    success = success || function(data){ console.log('ajax success:', data); };
    error = error || function(jqXHR, textStatus, errorThrown){ console.error('ajax error:', jqXHR); };
    var options={
      contentType: 'application/json',
      url: this.endpoint_prefix + url,
      type: type,
      success: success,
      error:error
    };
    if (data){
      if (type=='GET'){
        options.data=data;
      }else{
        options.data = JSON.stringify(data);
      }
    }
    options = $.extend(options, ajaxSettings);
    return $.ajax(options);
  };

  data.prototype.get = function(url, data, success, error){
    return this.request(url, 'GET', success, error, data);
  };

  data.prototype.post =  function(url, data, success, error){
    return this.request(url, 'POST', success, error, data);
  };

  data.prototype.put =  function(url, data, success, error){
    return this.request(url, 'PUT', success, error, data);
  };

  data.prototype['delete'] =  function(url, data, success, error){
    return this.request(url, 'DELETE', success, error, data);
  };

  return data;
});