/**
* @name OpenAjax
* @namespace
* aoaoa.js: Aspects Of Ajax Open Ajax compatible hub implementation
* This implementation is cut out of the open source AjaxEngine project,
* that includes a implementation inside the Javascript Common behaviors Library (jcl.js).
* See http://www.mathertel.de/AJAXEngine/controls/jcl.js
* Copyright (c) by Matthias Hertel, http://www.mathertel.de
* This work is licensed under a BSD style license. See http://www.mathertel.de/License.aspx
* More information on: http://ajaxaspects.blogspot.com/ and http://ajaxaspekte.blogspot.com/
*/

define(function(){
  "use strict";
  
  if (typeof(window.OpenAjax) == "undefined") {
    // setup the OpenAjax framework - hub
    window.OpenAjax = {};
  } // if
  
  if (typeof(OpenAjax.hub) == "undefined") {
    // a hub implementation
    OpenAjax.hub = {
    implementer: "http://www.mathertel.de/OpenAjax",
    implVersion: "0.4",
    specVersion: "0.5",
    implExtraData: {},
  
    // ----- library management -----
  
    // the list of libraries that have registered
    libraries: {},
  
    // Registers an Ajax library with the OpenAjax Hub. 
    registerLibrary: function (p, u, v, e) {
      var entry = { prefix: p, namespaceURI: u, version: v, extraData:e };
      this.libraries[p] = entry;
      this.publish("org.openajax.hub.registerLibrary", entry);
    },
  
    // Unregisters an Ajax library with the OpenAjax Hub.
    unregisterLibrary: function (p) {
      var entry = this.libraries[p];
      this.publish("org.openajax.hub.unregisterLibrary", entry);
      if (entry != null)
        this.libraries[p] = null;
    },
  
    // ----- event management -----
  
    _regs: {},
    _regsId: 0,
  
    /// name, callback, scope, data, filter
    subscribe: function (n, c, s, d, f) {
      var h = this._regsId;
  
      s = s || window;
  
      // treating upper/lowercase equal is not clearly defined, but true with domain names.
      var rn = n.toLocaleLowerCase();
  
      // build a regexp pattern that will match the event names
      rn = rn.replace(/\*\*$/, "\S{0,}").replace(/\./g, "\\.").replace(/\*/g, "[^.]*");
  
      var entry = {id:h, n:rn, c:c, s:s, d:d, f:f};
      this._regs[h] = entry;
  
      this._regsId++;
      return(h);
    }, // subscribe
  
  
    unsubscribe: function (h) {
      this._regs[h] = null;
    }, // unsubscribe
  
  
    publish: function (n, data) {
      n = n.toLocaleLowerCase();
      for (var h in this._regs) {
        var r = this._regs[h];
        if (r && (n.match(r.n))) {
          var ff = r.f; if (typeof(ff) == "string") ff = r.s[ff];
          var fc = r.c; if (typeof(fc) == "string") fc = r.s[fc];
          if ((ff == null) || (ff.call(r.s, n, data, r.d)))            
            fc.call(r.s, n, data, r.d)
        } // if
      } // for
    } // publish
  
    } // OpenAjax.hub
    OpenAjax.hub.registerLibrary("aoa", "http://www.mathertel.de/OpenAjax", "0.4", {});
  
  } // if (! hub)
  
  return OpenAjax.hub;
});