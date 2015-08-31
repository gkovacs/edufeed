(function(){
  var makeActivity, makeThumbnail, makeSocialThumbnail, out$ = typeof exports != 'undefined' && exports || this;
  out$.makeActivity = makeActivity = function(item){
    var itemtype, data, social, activity, output;
    itemtype = item.itemtype, data = item.data, social = item.social;
    activity = itemtype + '-activity';
    output = $("<" + activity + ">");
    setPropDict(output, data);
    if (social != null) {
      output[0].social = social;
    }
    return output;
  };
  out$.makeThumbnail = makeThumbnail = function(item){
    var itemtype, data, social, thumbnail, output;
    itemtype = item.itemtype, data = item.data, social = item.social;
    thumbnail = itemtype + '-thumbnail';
    output = $("<" + thumbnail + " id='thumbnail'>");
    setPropDict(output, data);
    if (social != null) {
      output[0].social = social;
    }
    return output;
  };
  out$.makeSocialThumbnail = makeSocialThumbnail = function(item){
    var itemtype, data, social, this$ = this;
    itemtype = item.itemtype, data = item.data, social = item.social;
    return getUsername(function(username){
      var thumbnail, output, wrapper;
      thumbnail = makeThumbnail(item);
      output = $('<social-thumbnail>').css({
        'margin-left': '5px',
        'margin-right': '5px',
        'margin-top': '5px'
      });
      wrapper = output.find('#thumbnailwrapper');
      wrapper.html('');
      thumbnail.appendTo(wrapper);
      setPropDict(output, social);
      if (social != null && social.finishedby != null && social.finishedby.indexOf(username) !== -1) {
        output.prop('finished', true);
      }
      return output;
    });
  };
}).call(this);
