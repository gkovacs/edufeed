// Generated by LiveScript 1.3.1
(function(){
  Polymer({
    is: 'colored-block-text',
    properties: {
      word: {
        type: String,
        value: 'dog',
        observer: 'wordChanged'
      }
    },
    wordToArray: function(x){
      return x.split('');
    },
    wordChanged: function(){}
  });
}).call(this);
