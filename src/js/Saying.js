class Saying {
  constructor (person) {
    this.person = person
    this.game = person.game

    this.addNum = null
    this.range = null
  }

  setAddNum (number) {
    if (this.isSaid())
      throw Error('addNum 只允许设定一次')

    number = Number(number)
    if (isNaN(number))
      throw Error('number 必须是数字')

    if (number <= 0)
      throw Error('number 不能小于等于 0')

    if (number > this.game.perMax)
      throw Error('number 不能大于 perMax')

    let nowNum = this.person.game.nowNum
    let numAdded = nowNum + number

    this.addNum = number
    this.range = {start: nowNum+1, end: numAdded}

    if (numAdded >= this.person.game.lastNum) {
      this.person.game.nowNum = this.person.game.lastNum
    } else {
      this.person.game.nowNum = numAdded
    }
  }

  isSaid () {
    return typeof this.addNum === "number"
  }
}

export default Saying
