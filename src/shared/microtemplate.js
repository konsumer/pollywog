// due to issues with formatting, i replaced this with EJS

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// pollywog adds html cleaning & raw() (no cleaning) & error-handling & single-quote + newline support
define(['share/util'], function(util){
  var tmpl = function(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn;

    try{

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
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

      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    }catch(e){
      var err = {
        message: e.message,
        input: data,
        error:e,
        template: str.split("\n")
      };

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