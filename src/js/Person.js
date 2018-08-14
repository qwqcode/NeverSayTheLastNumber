import Vue from 'vue'
import randomColor from 'randomcolor'
import Saying from "./Saying"

class Person {
  constructor (game, username, color) {
    this.game = game
    this.username = username
    this.color = color || randomColor({
      luminosity: 'bright',
      alpha: 0.5
    })
    this.onMe = () => {}
    this.sayingTemp = null

    let isFirstPerson = _.size(this.game.personList) === 0
    Vue.set(this.game.personList, username, this) // Username as Key
    if (isFirstPerson)
      this.game.nowPersonKey = username // this will call onMe
  }

  setOnMe (func) {
    this.onMe = () => {
      if (this.game.loserKey === null)
        func(this)
    }
  }

  canNewSaying () {
    return this.username === this.game.nowPersonKey
  }

  /**
   * Copy That
   */
  newSaying () {
    if (!this.canNewSaying())
      throw Error ('当前 Person 不能 newSaying')

    if (this.sayingTemp !== null)
      throw Error ('sayingTemp 已存在，请 setSaying')

    let saying = new Saying(this)
    this.game.sayingList.push(saying) // Global Saying
    this.sayingTemp = saying
  }

  /**
   * Say Something
   */
  setSaying (addNum) {
    if (this.sayingTemp === null)
      throw Error ('请先 newSaying()')

    this.sayingTemp.setAddNum(addNum)
    let saying = this.sayingTemp
    this.sayingTemp = null;
    this.game.onAfterSetSaying(saying, this)
  }
}

export default Person
