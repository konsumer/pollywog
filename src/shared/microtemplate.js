// due to issues with formatting, i replaced this with EJS

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// pollywog adds markdown, html cleaning & raw() (no cleaning) & error-handling & single-quote + newline support & sessionStorage caching
define(['share/util', 'share/showdown'], function(util, showdown, md5){
  var tmpl = function(key, t, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn, str;

    console.log(key, t);

    try{
      if (window.sessionStorage[key] === undefined){
        str = t;
        if (key.substr(-2) == 'md'){
          str = showdown.makeHtml(t);
        }
        fn = new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
          "with(obj){p.push('" +
          str
            .replace(/'/g,'&rsquo;')
            .replace(/†/g, "&dagger;")
            .replace(/[\r\n]/g, "†")
            .replace(/\t/g, "  ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=raw (.*?)%>/g, "',$1,'")
            .replace(/\t=(.*?)%>/g, "',require(\"share/util\").clean($1),'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'") +


          // Introduce the data as local variables using with(){}
          "');}return p.join('').replace(/†/g,\"\\n\");");

        window.sessionStorage[key] = fn.toString() + '; return anonymous(obj);';
      }else{
        console.log(key, 'from sessionStorage cache.');
        fn = new Function("obj", window.sessionStorage[key]);
      }

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    }catch(e){
      var err = {
        message: e.message,
        input: data,
        error:e
      };

      if (str){
        err.template = str.split("\n");
      }

      if (fn !== undefined){
        err.template_function = fn.toString().split("\n");
      }

      if (e.stack !== undefined){
        err.stack = e.stack.split("\n");
      }

      console.error('template error:', e.message, err);
    }
  };
  return tmpl;
});