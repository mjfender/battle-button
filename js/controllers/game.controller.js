class GameController {
  constructor() {
    this.$button = $('.button')
    this.$board = $('#board')
    this.clicks = 0
  }

  init() {
    this.$button.click( (event) => {
      this.startGame()
    })
  }


  startGame() {
    // Grab size of the button and visible page

    var buttonDims = {
      width: this.$button.outerWidth(),
      height:this.$button.outerHeight()
    }

    var pageDims = {
      width: $(window).width(),
      height: $(window).height()
    }

    // Locks in the dimensions of the board and adds outline
    $('#board').css(
      {
        'height': pageDims.height,
        'width': pageDims.width,
        'border-right': '#1e62d0 solid 2px',
        'border-bottom': '#1e62d0 solid 2px'
      })


    var newGame = new Game(buttonDims, pageDims)
    this.startRound(newGame)
  }

  startRound(newGame){
    this.$button.hide()
    this.$button.unbind("click")
    this.clicks = 0
    alert('Click or tap to guess where the button is hidden. Use the hints to find the button in as few guesses as possible.');
    this.$board.click( (event) => this.handleGuess(event, newGame))
  }

  handleGuess(event, newGame){
    if (this.clicks == 0) {
      // dealing with automatic click upon closing alert
      this.clicks ++
    } else {
        var result = newGame.checkMove({ X: event.clientX, Y: event.clientY })
        if (result == "win") {
          this.winGame(newGame)
        } else {
          this.giveHint(newGame, result)
          // use feedback from checkMove() to give a hint
        }
      }
  }

  giveHint(newGame, result) {
    var totalDistance = Math.abs(result.x) + Math.abs(result.y)
    var pctAccurate = ( totalDistance / (newGame.pageDims.width + newGame.pageDims.height) ) * 100
    if (pctAccurate >= 30) {

      $('#cold').toggleClass('hidden')
      setTimeout( function() { $('#cold').toggleClass('hidden')}, 2000)
    } else if (pctAccurate < 30 && pctAccurate > 15) {
      $('#warm').toggleClass('hidden')
      setTimeout( function() { $('#warm').toggleClass('hidden')}, 2000)
    } else {
      $('#hot').toggleClass('hidden')
      setTimeout( function() { $('#hot').toggleClass('hidden') }, 2000)
    }
    // console.log(pctAccurate)
  }

  winGame(newGame) {
    this.$board.unbind("click")
    this.$button.css({
      'left': newGame.hiddenButton.left,
      'top': newGame.hiddenButton.top,
      'position': 'absolute'
    })
    this.$button.show()
    this.$button.click( (event) => {
      this.startGame()
    })
    alert(`You won in ${newGame.attempts} tries!`)
  }

}
