// Generated by LiveScript 1.4.0
(function(){
  var startPage;
  startPage = function(){
    var params, tagname, tag, k, v;
    params = getUrlParameters();
    tagname = params.tag;
    if (params.activity != null) {
      tagname = params.activity + '-activity';
    }
    if (params.thumbnail != null) {
      tagname = params.thumbnail + '-thumbnail';
    }
    if (tagname == null) {
      tagname = 'side-scroll-feed';
    }
    tag = $("<" + tagname + ">");
    for (k in params) {
      v = params[k];
      if (k === 'tag') {
        continue;
      }
      tag.prop(k, v);
    }
    return tag.appendTo('#contents');
  };
  window.addEventListener('WebComponentsReady', function(e){
    return startPage();
  });
  /*
  window.addEventListener 'WebComponentsReady', (e) ->
    navigator.webkitPersistentStorage.requestQuota(
      1024*1024*100,
      (grantedBytes) ->
        window.webkitRequestFileSystem(
          PERSISTENT,
          grantedBytes,
          (filesystem) ->
            setFileSystem(filesystem)
            startPage()
          ,
          (err2) ->
            console.log 'error while requesting filesystem'
            console.log err2
        )
      ,
      (err1) ->
        console.log 'error while requesting quota'
        console.log err1
    )
  */
}).call(this);
