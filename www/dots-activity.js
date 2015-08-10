(function(){
  RegisterActivity({
    is: 'dots-activity',
    properties: {
      numdots: {
        type: Number,
        value: 5,
        observer: 'numdotsChanged'
      }
    },
    S: function(pattern){
      return $(this.$$(pattern));
    },
    numdotsChanged: function(){
      return this.S('#dotsgrid').prop('numdots', this.numdots);
    },
    selectedDotsChanged: function(obj, data){
      var xdim, ydim;
      xdim = data.xdim, ydim = data.ydim;
      console.log(data);
      return this.S('#formuladisplay').prop({
        term1: xdim,
        term2: ydim
      });
    },
    ready: function(){
      var width;
      width = Math.min($(window).height(), $(window).width());
      this.S('#dotsgrid').prop('width', width);
      return this.numdotsChanged();
    }
  });
}).call(this);
