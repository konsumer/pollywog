define(['share/open_ajax', 'share/jquery'], function(open_ajax, $){
/*

example:

index.html#search.results?q=Harry%20Potter
open_ajax.subscribe('search.results.enter', function(params){ console.log(params.q) } )


here is an overlay example:

index.html#search._results?q=Harry%20Potter
msg.subscribe('search._results.enter', function(params){ console.log(params.q) } )


for transitions:

msg.subscribe('search.results.after_enter', transitions.fadeIn )
msg.subscribe('search.resultsbefore_exit', transitions.fadeOut )


  page1 -> page2                            = page1 enter, page1 exit, page2 enter
  page1 -> _overlay1 -> page1               = page1 enter, overlay1 enter, overlay1 exit
  page1 -> _overlay1 -> page2               = page1 enter, overlay1 enter, overlay1 exit, page1 exit, page2 enter
  page1 -> _overlay1 -> _overlay2 -> page1  = page1 enter, overlay1 enter, overlay1 exit, overlay2 enter, overlay2 exit
  page1 -> _overlay1 -> _overlay2 -> page2  = page1 enter, overlay1 enter, overlay1 exit, overlay2 enter, overlay2 exit, page1 exit, page2 enter
  // !TODO: page1 -> page1?q=1 -> page1?q=2 -> page2  = page1 enter, page1 enter, page1 enter, page1 exit, page2 enter

  */

  open_ajax.subscribe('state.*.*', function(trigger, data){
    var t = trigger.split('.');
    var type = t[1]+ '.' + t[2];
    var oldClass;

    var i = {'new': data.newHash, 'old' : data.lastHash, 'params' : data.params, oldType: t[3], newType: t[4]};
    var newClass = data.newTrigger.replace(/\./ig,'_');
    if (data.oldTrigger){
      oldClass = data.oldTrigger.replace(/\./ig,'_');
    }

    i.newClass = newClass;

    if (type != 'initial.page' && type != 'page.overlay' && data.oldTrigger != data.newTrigger){
      open_ajax.publish(data.oldTrigger + '.before_exit', i);
      $('body').removeClass([oldClass, oldClass.split('_')[0]].join(" "));
      open_ajax.publish(data.oldTrigger + '.exit', i);
      open_ajax.publish(data.oldTrigger + '.after_exit', i);
    }

    if (type == 'overlay.page' && data.newTrigger != data.lastPageTrigger){
      oldClass = data.lastPageTrigger.replace(/\./ig,'_');
      open_ajax.publish(data.lastPageTrigger + '.before_exit', i);
      $('body').removeClass([oldClass, oldClass.split('_')[0]].join(" "));
      open_ajax.publish(data.lastPageTrigger + '.exit', i);
      open_ajax.publish(data.lastPageTrigger + '.after_exit', i);
    }

    open_ajax.publish(data.newTrigger + '.before_enter', i);
    
    $('body').removeClass('initial.page', 'overlay.page', 'page.overlay', 'page', 'overlay');
    $('body').addClass([newClass, type.replace('.','_'), newClass.split('_')[0], type.split('.')[1]].join(" "));
    open_ajax.publish(data.newTrigger + '.enter', i);
    open_ajax.publish(data.newTrigger + '.after_enter', i);

    console.log('STATE MESSAGE:', data.newTrigger, data);

  });

  var Hash=(function(intitial_hash){
    var lastHash, lastPageTrigger, newHash;
    newHash = document.location.hash.substring(1);

    $(window).on('hashchange', function(){
      newHash = document.location.hash.substring(1);
      if (newHash != lastHash || lastHash === undefined) {
        var d = newHash.split('?');
        var state_data = {
          newTrigger : d[0],
          lastHash : lastHash,
          lastPageTrigger : lastPageTrigger,
          initial: (lastHash === undefined),
          newHash: newHash
        };
        state_data.newIsPage = state_data.newTrigger.split('.').pop()[0] != '_';

        if (lastHash !== undefined){ // old hash exists, apply some logics
          state_data.oldTrigger = lastHash.split('?')[0];
          state_data.oldIsPage = ( state_data.oldTrigger.split('.').pop()[0] != '_' ) && lastHash !== undefined;
        }

        state_data.params = {};
        if (d[1]){
          d = d[1].split('&');
          for (var i in d){
            var v = d[i].split('=');
            state_data.params[decodeURIComponent(v[0]).replace('+', ' ')] = decodeURIComponent(v[1].replace(/\+/g, ' '));
          }
        }

        if (state_data.oldIsPage){
          if (state_data.newIsPage){
            open_ajax.publish('state.page.page', state_data);
          }else{
            open_ajax.publish('state.page.overlay', state_data);
          }
        }else{
          if (state_data.newIsPage){
            if (lastHash === undefined){
              open_ajax.publish('state.initial.page', state_data);
            }else{
              open_ajax.publish('state.overlay.page', state_data);
            }
          }else{
            open_ajax.publish('state.overlay.overlay', state_data);
          }
        }
        if (state_data.newIsPage){
          lastPageTrigger = state_data.newTrigger;
        }

        lastHash = newHash;
      }
    });

    if (newHash === ""){
      document.location = '#' + intitial_hash;
    }else{
      $(window).trigger('hashchange');
    }
  });
  
  Hash.makeHash = function(endpoint, params){
    if (typeof(endpoint) == 'object'){
      params = endpoint;
      endpoint = window.lastHash.split('?')[0];
    }
    var out=[];
    for (var p in params){
      out.push(p+'='+encodeURIComponent(params[p]));
    }
    return '#' + endpoint + '?' + out.join('&');
  };

  return Hash;

});
