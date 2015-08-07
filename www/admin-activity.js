// Generated by LiveScript 1.3.1
(function(){
  RegisterActivity({
    is: 'admin-activity',
    S: function(pattern){
      return $(this.$$(pattern));
    },
    ready: function(){
      var self;
      self = this;
      return getUsername(function(username){
        return getPassword(function(password){
          self.S('#usernameinput').val(username);
          return self.S('#passwordinput').val(password);
        });
      });
    },
    appcacheStatus: function(){
      return ['uncached', 'idle', 'checking', 'downloading', 'updateready'][window.applicationCache.status];
    },
    reallySetUsername: function(username, password){
      return setUsername(username, function(){
        return setPassword(password, function(){
          return window.location.reload();
        });
      });
    },
    setUsername: function(){
      var self, username, password;
      self = this;
      username = this.S('#usernameinput').val().trim();
      password = this.S('#passwordinput').val().trim();
      return (function(login_successful){
        if (!login_successful) {
          return bootbox.confirm("Login was unsuccessful, are you sure you would like to update the stored username and password?", function(certain){
            if (certain) {
              return self.reallySetUsername(username, password);
            } else {
              return getUsername(function(nusername){
                return getPassword(function(npassword){
                  self.S('#usernameinput').val(nusername);
                  return self.S('#passwordinput').val(npassword);
                });
              });
            }
          });
        } else {
          return self.reallySetUsername(username, password);
        }
      }.call(this, true));
    },
    makeFullScreen: function(){
      var ssfeed, rfs;
      ssfeed = $('side-scroll-feed')[0];
      rfs = document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen || document.body.requestFullScreen;
      if (rfs) {
        return rfs.call(ssfeed);
      }
    },
    clearItems: function(){
      var self;
      self = this;
      return getUsername(function(username){
        return clearDb("feeditems_" + username, function(){
          return self.fire('task-finished', self);
        });
      });
    },
    addSampleItems: function(){
      var self;
      self = this;
      return getUsername(function(username){
        var wordlist, items, word;
        wordlist = ['cat', 'dog', 'white', 'black', 'blue', 'red', 'bee', 'bird', 'lion', 'tiger', 'fish', 'city', 'house', 'roof', 'tree', 'river', 'apple', 'banana', 'cherry', 'orange', 'pear'];
        items = [
          {
            itemtype: 'admin',
            social: {
              poster: 'horse'
            }
          }, {
            itemtype: 'example',
            data: {
              foo: 'somefooval',
              bar: 'somebarval'
            },
            social: {
              poster: 'mouse',
              finishedby: ['elephant']
            }
          }
        ].concat((function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = wordlist).length; i$ < len$; ++i$) {
            word = ref$[i$];
            results$.push({
              itemtype: 'typeword',
              data: {
                word: word
              },
              social: {
                poster: 'dog',
                finishedby: ['zebra']
              }
            });
          }
          return results$;
        }()));
        return async.each(items, function(item, callback){
          return postItem("feeditems_" + username, item, callback);
        }, function(results){
          return self.fire('task-finished', self);
        });
      });
    },
    addCustomItem: function(){
      var self, itemtype, data_text, data, social_text, social;
      self = this;
      itemtype = this.S('#itemtypeinput').val();
      if (itemtype == null || itemtype.length === 0) {
        alert('must specify itemtype');
        return;
      }
      data_text = this.S('#datainput').val();
      data = jsyaml.safeLoad(data_text);
      social_text = this.S('#socialinput').val();
      social = jsyaml.safeLoad(social_text);
      return postItem("feeditems_" + username, {
        itemtype: itemtype,
        data: data,
        social: social
      }, function(){
        return self.fire('task-finished', self);
      });
    },
    displayLogs: function(){
      var this$ = this;
      return getlogs(function(logs){
        return this$.S('#logdisplay').text(JSON.stringify(logs));
      });
    },
    downloadLogs: function(){
      var this$ = this;
      return getlogs(function(logs){
        return document.location = 'data:Application/octet-stream,' + encodeURIComponent(JSON.stringify(logs));
      });
    }
  });
}).call(this);
