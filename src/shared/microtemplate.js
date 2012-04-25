// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// Rewritten by Andreas Kalsch to preserve newlines and accept single quotes
// https://github.com/creationix/microtemplates

define(['share/util', 'share/showdown'], function(util, showdown){
  var tmpl = function(str, data, markdown){
    if (markdown){
      return showdown.makeHtml(str);
    }

    var parts = str.split(/<%|%>/);
    var fnBody = "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){";
    for (var ii = parts.length, i = 0; i < ii; i++) {
      fnBody += i % 2 ? ( parts[i][0] == '=' ? "print(require(\"share/util\").clean("+parts[i].substr(1)+"));" : parts[i] ) : "p.push('"+parts[i].replace(/\n/g, '\\n\\\n').replace(/'/g, "\\'")+"');\n";
    }
    fnBody += "}return p.join('');";
    var fn = new Function("obj", fnBody);

    try{
      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    }catch(e){
      var err = {
        message: e.message,
        input: data,
        error:e,
        template: str.split("\n"),
        template_function:fn.toString().split("\n")
      };

      if (e.stack !== undefined){
        err.stack = e.stack.split("\n");
      }

      console.error('template error:', e.message, err);
    }
  };
  return tmpl;
});