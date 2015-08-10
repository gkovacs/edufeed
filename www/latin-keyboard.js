(function(){
  Polymer({
    is: 'latin-keyboard',
    properties: {
      keys: {
        type: String,
        value: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].join('')
      },
      hiddenkeys: {
        type: String,
        value: '',
        observer: 'hiddenKeysChanged'
      }
    },
    getKeyId: function(key){
      return 'key' + key;
    },
    hiddenKeysChanged: function(newvalue, oldvalue){
      var i$, ref$, len$, x, results$ = [];
      for (i$ = 0, len$ = (ref$ = $(this).find('keyboard-button')).length; i$ < len$; ++i$) {
        x = ref$[i$];
        results$.push(x.ishidden = this.isKeyHidden(x.keytext));
      }
      return results$;
    },
    computeKeysArray: function(keys){
      return keys.split('');
    },
    isKeyHidden: function(key){
      return this.hiddenkeys.indexOf(key) !== -1;
    }
  });
}).call(this);
