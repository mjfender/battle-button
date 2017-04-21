class Game {
  constructor(buttonDims, pageDims, difficulty= 0) {
    this.buttonSize = buttonDims
    this.pageDims = pageDims
    this.diffulty = difficulty
    this.attempts = 0
    this.hiddenButton = {
      top: Math.floor(Math.random() * (this.pageDims.height - this.buttonSize.height)),
      left: Math.floor(Math.random() * (this.pageDims.width - this.buttonSize.width))
      }
  }

  checkMove(clickPos) {
    var x = clickPos.X
    var y = clickPos.Y
    var xValid = (x >= this.hiddenButton.left && x<= this.hiddenButton.left + this.buttonSize.width)
    var yValid = (y >= this.hiddenButton.top && y<= this.hiddenButton.top + this.buttonSize.height)


    // if x or y is negative, it means button is higher or further to left
    var positionDifs = {
      x: this.hiddenButton.left - x,
      y: this.hiddenButton.top - y
    }

    // console.log(xValid)
    // console.log(yValid)
    this.attempts ++

    if (xValid & yValid) {
      console.log("WIN")
      return "win"
    } else {
      console.log("FAIL!")
      return positionDifs
    }
  }

}
