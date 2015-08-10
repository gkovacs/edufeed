(function(){
  Polymer({
    is: 'multiply-formula-display',
    properties: {
      term1: {
        type: Number,
        value: 0,
        notify: true
      },
      term2: {
        type: Number,
        value: 0,
        notify: true
      },
      product: {
        type: Number,
        computed: 'computeProduct(term1, term2)',
        observer: 'productChanged'
      }
    },
    S: function(pattern){
      return $(this.$$(pattern));
    },
    computeProduct: function(term1, term2){
      return term1 * term2;
    },
    productChanged: function(){
      if (this.product === 0) {
        return;
      }
      this.S('#productbackground').css('opacity', '1');
      this.S('#productbackground').animate({
        'opacity': 0
      }, 800);
      return console.log(this.product);
    }
  });
}).call(this);
