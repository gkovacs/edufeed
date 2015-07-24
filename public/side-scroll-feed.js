// Generated by LiveScript 1.3.1
(function(){
  Polymer({
    is: 'side-scroll-feed',
    properties: {
      items: {
        type: Array,
        value: [],
        observer: 'itemsChanged'
      }
    },
    S: function(pattern){
      return $(this.$$(pattern));
    },
    closeActivity: function(){
      this.S('#activity').html('');
      this.S('#thumbnails').show();
      return this.S('#exitbutton').hide();
    },
    openItem: function(item){
      var activity, this$ = this;
      this.S('#thumbnails').hide();
      this.S('#exitbutton').show();
      this.S('#activity').html('');
      activity = makeActivity(item);
      activity.on('task-finished', function(){
        return this$.closeActivity();
      });
      return activity.appendTo(this.S('#activity'));
    },
    addItemToFeed: function(item){
      var thumbnail, this$ = this;
      thumbnail = makeThumbnail(item);
      thumbnail.click(function(){
        return this$.openItem(item);
      });
      return thumbnail.appendTo(this.S('#thumbnails'));
    },
    itemsChanged: function(){
      var i$, ref$, len$, item, results$ = [];
      $(this.S('#thumbnails')).html('');
      for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
        item = ref$[i$];
        results$.push(this.addItemToFeed(item));
      }
      return results$;
    },
    ready: function(){
      var self, update_items;
      self = this;
      update_items = function(){
        return getItems('feeditems', function(docs){
          return self.items = docs;
        });
      };
      update_items();
      return setSyncHandler('feeditems', function(change){
        return update_items();
      });
    }
  });
}).call(this);
