Polymer {
  is: 'multiply-formula-display'
  /*
  properties: {
    numdots: {
      type: Number
      value: 5
      observer: 'numdotsChanged'
    }
  }
  S: (pattern) ->
    $(this.$$(pattern))
  numdotsChanged: ->
    this.S('#dotsgrid').prop 'numdots', this.numdots
  ready: ->
    width = Math.min $(window).height(), $(window).width()
    this.S('#dotsgrid').prop 'width', width
    this.numdotsChanged()
  */
}