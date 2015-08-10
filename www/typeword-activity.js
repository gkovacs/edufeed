(function(){
  var synthesize_word, play_wrong_sound;
  synthesize_word = function(word){
    var synth_lang, video_tag, play_audio;
    synth_lang = 'en';
    video_tag = $('#synthesizeword');
    if (video_tag.length === 0) {
      video_tag = $('<audio>').prop('id', 'synthesizeword').css({
        display: 'none'
      });
      $('body').append(video_tag);
    }
    play_audio = function(){
      video_tag[0].currentTime = 0;
      return video_tag[0].play();
    };
    video_tag[0].removeEventListener('canplaythrough', play_audio);
    video_tag[0].addEventListener('canplaythrough', play_audio);
    return get_speechsynth_paths(function(speechsynth_paths){
      if (speechsynth_paths[word] != null) {
        return fetchAsDataURL(speechsynth_paths[word], function(dataurl){
          return video_tag.attr('src', dataurl);
        });
      } else {
        return video_tag.attr('src', 'http://speechsynth.herokuapp.com/speechsynth?' + $.param({
          lang: synth_lang,
          word: word
        }));
      }
    });
  };
  play_wrong_sound = function(){
    var synth_lang, video_tag, play_audio;
    synth_lang = 'en';
    video_tag = $('#synthesizeword');
    if (video_tag.length === 0) {
      video_tag = $('<audio>').prop('id', 'synthesizeword').css({
        display: 'none'
      });
      $('body').append(video_tag);
    }
    play_audio = function(){
      video_tag[0].currentTime = 0;
      return video_tag[0].play();
    };
    video_tag[0].removeEventListener('canplaythrough', play_audio);
    video_tag[0].addEventListener('canplaythrough', play_audio);
    return video_tag.attr('src', '/wrong.mp3');
  };
  RegisterActivity({
    is: 'typeword-activity',
    properties: {
      word: {
        type: String,
        value: '',
        observer: 'wordChanged'
      },
      difficulty: {
        type: Number,
        value: 0,
        observer: 'shownKeysChanged'
      },
      partialword: {
        type: String,
        value: '',
        observer: 'partialwordChanged'
      }
    },
    playword: function(){
      return synthesize_word(this.word);
    },
    wordChanged: function(){
      this.playword();
      return this.shownKeysChanged();
    },
    partialwordChanged: function(){
      this.$$('#inputarea').innerText = this.partialword;
      return this.shownKeysChanged();
    },
    keyTyped: function(evt, key){
      var keyboard, letter, next_letter, newkeys, x, this$ = this;
      keyboard = this.$$('#keyboard');
      letter = key.keytext;
      next_letter = this.nextLetter();
      if (letter !== next_letter) {
        this.incorrect += 1;
        play_wrong_sound();
        newkeys = (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = keyboard.shownkeys.split('')).length; i$ < len$; ++i$) {
            x = ref$[i$];
            if (x !== letter) {
              results$.push(x);
            }
          }
          return results$;
        }()).join('');
        console.log('new keys shown are:');
        console.log(newkeys);
        keyboard.highlightkey = next_letter;
      }
      if (letter === next_letter) {
        if (this.partialword + letter === this.word) {
          if (this.difficulty < 3) {
            this.difficulty += 1;
          } else {
            this.fire('task-finished', this);
          }
          this.partialword = '';
          return setTimeout(function(){
            return this$.playword();
          }, 500);
        } else {
          return this.partialword = this.partialword + letter;
        }
      }
    },
    nextLetter: function(){
      if (this.word === this.partialword || this.word == null || this.partialword == null) {
        return '';
      }
      return this.word[this.partialword.length];
    },
    shownKeysChanged: function(){
      var keyboard, next_letter;
      this.incorrect = 0;
      keyboard = this.$$('#keyboard');
      next_letter = this.nextLetter();
      console.log('next_letter is:' + next_letter);
      if (this.partialword != null) {
        console.log(this.partialword.length);
        this.$$('#wordspan').highlightidx = this.partialword.length;
      }
      keyboard.highlightkey = '';
      if (this.difficulty === 0) {
        keyboard.shownkeys = next_letter;
      }
      if (this.difficulty === 1) {
        keyboard.shownkeys = this.word;
      }
      if (this.difficulty === 2) {
        keyboard.shownkeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].join('');
      }
      if (this.difficulty === 3) {
        keyboard.shownkeys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].join('');
      }
      if (this.difficulty === 3) {
        return this.$$('#wordspan').style.visibility = 'hidden';
      } else {
        return this.$$('#wordspan').style.visibility = 'visible';
      }
    }
  });
}).call(this);
