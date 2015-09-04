(function(){
  var isChromeApp, isMobileChromeApp, fixMediaURL, getLocalStorage, getUsername, getPassword, getCouchURL, setUsername, setPassword, setCouchURL, memoizeSingleAsync, onceTrue, getClasses, getAllUsers, getClassmates, errorlog, adderror, geterrors, itemtype_and_data_matches, social_sharing_data, setSocialSharingData, getSocialSharingData, getUrlParameters, getParam, getBoolParam, setParam, parseInlineCSS, applyStyleTo, setPropDict, tagMatchesItem, out$ = typeof exports != 'undefined' && exports || this;
  out$.isChromeApp = isChromeApp = function(){
    return (typeof chrome != 'undefined' && chrome !== null) && chrome.app != null && chrome.app.runtime != null;
  };
  out$.isMobileChromeApp = isMobileChromeApp = function(){
    return (typeof chrome != 'undefined' && chrome !== null) && chrome.app != null && chrome.app.runtime != null && chrome.mobile != null;
  };
  out$.fixMediaURL = fixMediaURL = function(url){
    if (isMobileChromeApp()) {
      return 'file:///android_asset/www/' + url;
    }
    return url;
  };
  out$.getLocalStorage = getLocalStorage = function(){
    if (isChromeApp() && !isMobileChromeApp()) {
      return {
        get: function(key, callback){
          return chrome.storage.local.get(key, function(dict){
            return callback(dict[key]);
          });
        },
        set: function(key, val, callback){
          var dict;
          dict = {};
          dict[key] = val;
          if (callback != null) {
            return chrome.storage.local.set(dict, function(){
              return callback(val);
            });
          } else {
            return chrome.storage.local.set(dict);
          }
        }
      };
    }
    if (window.localStorage != null) {
      return {
        get: function(key, callback){
          return callback(window.localStorage.getItem(key));
        },
        set: function(key, val, callback){
          window.localStorage.setItem(key, val);
          if (callback != null) {
            return callback(val);
          }
        }
      };
    }
  };
  out$.getUsername = getUsername = function(callback){
    return getLocalStorage().get('username', function(username){
      return callback(username != null ? username : 'guestuser');
    });
  };
  out$.getPassword = getPassword = function(callback){
    return getLocalStorage().get('password', function(password){
      return callback(password != null ? password : 'guestuser');
    });
  };
  out$.getCouchURL = getCouchURL = function(callback){
    var default_couch_server;
    default_couch_server = '127.0.0.1:5984';
    return getLocalStorage().get('couchserver', function(couchserver){
      if (couchserver != null && couchserver.length > 0) {
        callback(couchserver);
      } else {
        return $.get('/getcouchserver').done(function(data){
          if (data != null && data.length > 0) {
            return setCouchURL(data, function(){
              return callback(data);
            });
          } else {
            return callback(default_couch_server);
          }
        }).fail(function(){
          return callback(default_couch_server);
        });
      }
    });
  };
  out$.setUsername = setUsername = function(username, callback){
    return getLocalStorage().set('username', username, callback);
  };
  out$.setPassword = setPassword = function(password, callback){
    return getLocalStorage().set('password', password, callback);
  };
  out$.setCouchURL = setCouchURL = function(couchserver, callback){
    if (couchserver.indexOf('cloudant.com') === -1) {
      if (couchserver.indexOf(':') === -1) {
        couchserver = couchserver + ':5984';
      }
    }
    return getLocalStorage().set('couchserver', couchserver, callback);
  };
  out$.memoizeSingleAsync = memoizeSingleAsync = function(func){
    var cached_val;
    cached_val = null;
    return function(callback){
      if (cached_val != null) {
        callback(cached_val);
        return;
      }
      return func(function(result){
        cached_val = result;
        return callback(result);
      });
    };
  };
  out$.onceTrue = onceTrue = function(condition, callback){
    if (condition()) {
      return callback();
    } else {
      return setTimeout(function(){
        return onceTrue(condition, callback);
      }, 100);
    }
  };
  out$.getClasses = getClasses = memoizeSingleAsync(function(callback){
    return $.get('/classes.yaml', function(yamltxt){
      var data;
      data = jsyaml.safeLoad(yamltxt);
      return callback(data);
    });
  });
  out$.getAllUsers = getAllUsers = function(callback){
    return getClasses(function(classes){
      var all_users, classname, classinfo;
      all_users = [];
      for (classname in classes) {
        classinfo = classes[classname];
        all_users = all_users.concat(classinfo.users);
      }
      return callback(all_users);
    });
  };
  out$.getClassmates = getClassmates = function(username, callback){
    return getClasses(function(classes){
      var classname, classinfo, users;
      for (classname in classes) {
        classinfo = classes[classname];
        users = classinfo.users;
        if (users.indexOf(username) !== -1) {
          callback(users);
          return;
        }
      }
      return callback([]);
    });
  };
  errorlog = [];
  out$.adderror = adderror = function(postdata){
    console.log(postdata);
    return errorlog.push(postdata);
  };
  out$.geterrors = geterrors = function(callback){
    var x;
    return callback((function(){
      var i$, ref$, len$, results$ = [];
      for (i$ = 0, len$ = (ref$ = errorlog).length; i$ < len$; ++i$) {
        x = ref$[i$];
        results$.push(x);
      }
      return results$;
    }()));
  };
  out$.itemtype_and_data_matches = itemtype_and_data_matches = function(item1, item2){
    if (item1.itemtype !== item2.itemtype) {
      return false;
    }
    if (deepEq$(item1.data, item2.data, '===')) {
      return true;
    }
    return false;
  };
  social_sharing_data = {};
  out$.setSocialSharingData = setSocialSharingData = function(itemtype, data){
    return social_sharing_data[itemtype] = data;
  };
  out$.getSocialSharingData = getSocialSharingData = function(itemtype){
    return social_sharing_data[itemtype];
  };
  /*
  localinfo = {}
  export setFileSystem = (filesystem, callback) ->
    localinfo.filesystem = filesystem
  
  export getFileSystem = ->
    return localinfo.filesystem
  
  export getDir = (dirname, callback) ->
    filesystem = getFileSystem()
    filesystem.root.getDirectory(
      dirname,
      {create: true},
      (direntry) ->
        callback direntry
      ,
      (err) ->
        console.log 'error getting directory ' + dirname
        console.log err
    )
  
  export getImageFile = (filename, callback) ->
    getDir 'images', (imgdir) ->
      imgdir.getFile(
        filename,
        {create: true},
        (imgfile) ->
          callback imgfile
        ,
        (err) ->
          console.log 'error getting file ' + filename
          console.log err
      )
  
  export writeImageMimetype = (imgname, mimetype, callback) ->
    getImageFileWriter imgname + '.txt', (filewriter) ->
      filewriter.onwriteend = (e) ->
        if callback?
          callback()
      filewriter.write new Blob([mimetype], {type: 'text/plain'})
  
  export writeImageData = (imgname, base64data, callback) ->
    getImageFileWriter imgname + '.jpg', (filewriter) ->
      filewriter.onwriteend = (e) ->
        if callback?
          callback()
      filewriter.write base64toblob(base64data, {type: ''})
  
  export writeImageToFile = (imgname, base64string, callback) ->
    mimetype = base64string.slice(base64string.indexOf(':') + 1, base64string.indexOf(';'))
    base64data = base64string.slice(base64string.indexOf(',') + 1)
    writeImageMimetype imgname, mimetype, ->
      writeImageData imgname, base64data, ->
        if callback?
          callback()
  
  export getImageFileReader = (filename, callback) ->
    getImageFile filename, (imgfile) ->
      callback new FileReader(imgfile.file)
  
  export getImageFileWriter = (filename, callback) ->
    getImageFile filename, (imgfile) ->
      imgfile.createWriter (filewriter) ->
        callback filewriter
  */
  out$.getUrlParameters = getUrlParameters = function(){
    var url, hash, map, parts;
    url = window.location.href;
    hash = url.lastIndexOf('#');
    if (hash !== -1) {
      url = url.slice(0, hash);
    }
    map = {};
    parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
      return map[key] = decodeURIComponent(value).split('+').join(' ');
    });
    return map;
  };
  out$.getParam = getParam = function(key, callback){
    var value;
    value = getUrlParameters()[key];
    if (value != null) {
      callback(value);
      return;
    }
    return getLocalStorage().get(key, function(val){
      return callback(val);
    });
  };
  out$.getBoolParam = getBoolParam = function(key, callback){
    return getParam(key, function(val){
      if (val != null && (val === true || (val.length != null && val[0] != null && ['t', 'T', 'y', 'Y'].indexOf(val[0]) !== -1))) {
        callback(true);
        return;
      }
      return callback(false);
    });
  };
  out$.setParam = setParam = function(key, val){
    var new_params;
    getLocalStorage().set(key, val);
    new_params = getUrlParameters();
    new_params[key] = val;
    return window.history.pushState(null, null, window.location.pathname + '?' + $.param(new_params));
  };
  out$.parseInlineCSS = parseInlineCSS = function(text){
    var output, i$, ref$, len$, line, ref1$, key, value;
    output = {};
    for (i$ = 0, len$ = (ref$ = text.split(';')).length; i$ < len$; ++i$) {
      line = ref$[i$];
      if (line == null) {
        continue;
      }
      line = line.trim();
      if (line.length === 0) {
        continue;
      }
      ref1$ = line.split(':'), key = ref1$[0], value = ref1$[1];
      if (key == null || value == null) {
        continue;
      }
      key = key.trim();
      value = value.trim();
      if (key.length === 0 || value.length === 0) {
        continue;
      }
      output[key] = value;
    }
    return output;
  };
  out$.applyStyleTo = applyStyleTo = function(tag, style){
    var k, ref$, v, results$ = [];
    for (k in ref$ = parseInlineCSS(style)) {
      v = ref$[k];
      results$.push(tag.style[k] = v);
    }
    return results$;
  };
  out$.setPropDict = setPropDict = function(tag, data){
    var k, v, results$ = [], results1$ = [];
    if (data != null) {
      if (tag.prop != null && typeof tag.prop === 'function') {
        for (k in data) {
          v = data[k];
          results$.push(tag.prop(k, v));
        }
        return results$;
      } else {
        for (k in data) {
          v = data[k];
          results1$.push(tag[k] = v);
        }
        return results1$;
      }
    }
  };
  out$.tagMatchesItem = tagMatchesItem = function(tag, item){
    var itemtype, data, tag_type, k, v;
    itemtype = item.itemtype, data = item.data;
    tag_type = tag.tagName.toLowerCase().split('-thumbnail').join('').split('-activity').join('');
    if (itemtype !== tag_type) {
      return false;
    }
    if (data != null) {
      for (k in data) {
        v = data[k];
        if (tag[k] !== v) {
          return false;
        }
      }
    }
    return true;
  };
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
