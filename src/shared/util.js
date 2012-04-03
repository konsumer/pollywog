define(function() {

  /**
   * Lookup table for decodeEntities.
   *
   * @see https://raw.github.com/kvz/phpjs/master/functions/strings/get_html_translation_table.js
   * @licence http://phpjs.org/pages/license/#MIT
   */
  var _get_html_translation_table = function (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
      hash_map = {},
      decimal;
    var constMappingTable = {},
      constMappingQuoteStyle = {};
    var useTable = {},
      useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
      throw new Error("Table: " + useTable + ' not supported');
      // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
      entities['160'] = '&nbsp;';
      entities['161'] = '&iexcl;';
      entities['162'] = '&cent;';
      entities['163'] = '&pound;';
      entities['164'] = '&curren;';
      entities['165'] = '&yen;';
      entities['166'] = '&brvbar;';
      entities['167'] = '&sect;';
      entities['168'] = '&uml;';
      entities['169'] = '&copy;';
      entities['170'] = '&ordf;';
      entities['171'] = '&laquo;';
      entities['172'] = '&not;';
      entities['173'] = '&shy;';
      entities['174'] = '&reg;';
      entities['175'] = '&macr;';
      entities['176'] = '&deg;';
      entities['177'] = '&plusmn;';
      entities['178'] = '&sup2;';
      entities['179'] = '&sup3;';
      entities['180'] = '&acute;';
      entities['181'] = '&micro;';
      entities['182'] = '&para;';
      entities['183'] = '&middot;';
      entities['184'] = '&cedil;';
      entities['185'] = '&sup1;';
      entities['186'] = '&ordm;';
      entities['187'] = '&raquo;';
      entities['188'] = '&frac14;';
      entities['189'] = '&frac12;';
      entities['190'] = '&frac34;';
      entities['191'] = '&iquest;';
      entities['192'] = '&Agrave;';
      entities['193'] = '&Aacute;';
      entities['194'] = '&Acirc;';
      entities['195'] = '&Atilde;';
      entities['196'] = '&Auml;';
      entities['197'] = '&Aring;';
      entities['198'] = '&AElig;';
      entities['199'] = '&Ccedil;';
      entities['200'] = '&Egrave;';
      entities['201'] = '&Eacute;';
      entities['202'] = '&Ecirc;';
      entities['203'] = '&Euml;';
      entities['204'] = '&Igrave;';
      entities['205'] = '&Iacute;';
      entities['206'] = '&Icirc;';
      entities['207'] = '&Iuml;';
      entities['208'] = '&ETH;';
      entities['209'] = '&Ntilde;';
      entities['210'] = '&Ograve;';
      entities['211'] = '&Oacute;';
      entities['212'] = '&Ocirc;';
      entities['213'] = '&Otilde;';
      entities['214'] = '&Ouml;';
      entities['215'] = '&times;';
      entities['216'] = '&Oslash;';
      entities['217'] = '&Ugrave;';
      entities['218'] = '&Uacute;';
      entities['219'] = '&Ucirc;';
      entities['220'] = '&Uuml;';
      entities['221'] = '&Yacute;';
      entities['222'] = '&THORN;';
      entities['223'] = '&szlig;';
      entities['224'] = '&agrave;';
      entities['225'] = '&aacute;';
      entities['226'] = '&acirc;';
      entities['227'] = '&atilde;';
      entities['228'] = '&auml;';
      entities['229'] = '&aring;';
      entities['230'] = '&aelig;';
      entities['231'] = '&ccedil;';
      entities['232'] = '&egrave;';
      entities['233'] = '&eacute;';
      entities['234'] = '&ecirc;';
      entities['235'] = '&euml;';
      entities['236'] = '&igrave;';
      entities['237'] = '&iacute;';
      entities['238'] = '&icirc;';
      entities['239'] = '&iuml;';
      entities['240'] = '&eth;';
      entities['241'] = '&ntilde;';
      entities['242'] = '&ograve;';
      entities['243'] = '&oacute;';
      entities['244'] = '&ocirc;';
      entities['245'] = '&otilde;';
      entities['246'] = '&ouml;';
      entities['247'] = '&divide;';
      entities['248'] = '&oslash;';
      entities['249'] = '&ugrave;';
      entities['250'] = '&uacute;';
      entities['251'] = '&ucirc;';
      entities['252'] = '&uuml;';
      entities['253'] = '&yacute;';
      entities['254'] = '&thorn;';
      entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
      entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
      entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
      if (entities.hasOwnProperty(decimal)) {
        hash_map[String.fromCharCode(decimal)] = entities[decimal];
      }
    }

    return hash_map;
  };

  var array_combine =function (keys, values) {
      var new_array = {},
          keycount = keys && keys.length,
          i = 0;
      if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
      typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
          return false;
      }
      if (keycount != values.length) {
          return false;
      }
      for (i = 0; i < keycount; i++) {
          new_array[keys[i]] = values[i];
      }
      return new_array;
  };

  // shallow-copy
  Object.defineProperty(Object.prototype, "copy", {
      enumerable: false,
      value: function(from) {
          var props = Object.getOwnPropertyNames(this);
          var values=[];
          var dest=this;
          props.forEach(function(name) {
              values.push(dest[name]);
          });
          return array_combine (props, values);
      }
  });

  return {
    array_combine:array_combine,

    randInt: function(size) {
      var rNum = Math.ceil(Math.random() * size);
      return rNum;
    },
    
    highestResolution: function(thumbnails) {
      var result = 0;
      var maxHeight = 0;
      for(var i in thumbnails) {
        var newHeight = thumbnails[i].height;
        if(newHeight > maxHeight) {
          result = i;
          maxHeight = newHeight;
        }
      }
      return result;
    },

    clean: function(str){
      if (str !== null){
        str=str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#039;').replace(/"/g, '&quot;');
      }
      return str;
    },

    zeroFill: function(number, width, dir) {
      width = width || 2;
      if(dir){
        width -= number.toString().length;
        if (width > 0) {
          while(width>0) {
            number = "0" + number;
            width--;
          }
        }
        return number;
      } else {
        width -= number.toString().length;
        if (width > 0) {
          return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number;
      }
    },
    
    filterOffersByDevice: function (offers) {
      var result = [];
      for (var offer in offers) {
        if ((offers[offer].devices.indexOf("ipad") != -1 && layout == LAYOUT_TABLET) || (offers[offer].devices.indexOf("iphone") != -1 && layout == LAYOUT_PHONE)) {
          result.push(offers[offer]);
        }
      }
      return result;
    },
    
    /**
     * Decodes all HTML entities to regular UTF-8 bytes.
     *
     * @see https://raw.github.com/kvz/phpjs/master/functions/strings/html_entity_decode.js
     * @licence http://phpjs.org/pages/license/#MIT
     */
    decodeEntities: function (string, quote_style) {
      var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
        tmp_str = string.toString();

      if (false === (hash_map = _get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
      }

      // fix &amp; problem
      // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
      delete(hash_map['&']);
      hash_map['&'] = '&amp;';

      for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
      }
      tmp_str = tmp_str.split('&#039;').join("'");

      return tmp_str;
    },

    /**
     * Show how long it takes to run something
     * @param  {Function} callback what to call
     * @param  {Number} count number of times to call it - defaults to 1
     * @return {[type]}
     */
    time : function(callback, count){
      count = count || 1;
      var t=(new Date()).getMilliseconds();
      for (var i=0; i<count; i++){
        callback();
      }
      t =  (new Date()).getMilliseconds() - t;
      console.log('callback ran ' + count + ' times, took ' + t + 'ms.');
    },

    /**
     * convert millisconds to minutes
     * @param  {Number} ms millisconds
     * @return {Number} number of minutes
     */
    milliscondsToMinutes : function(ms){
      return parseInt(ms * 1.66666666666667e-05, 10);
    }

  };
});
