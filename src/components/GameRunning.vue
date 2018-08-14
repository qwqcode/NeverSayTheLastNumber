<template>
  <div class="game-running">
    <div class="game-body" v-if="!loserKey">

      <div class="number-block-list">
        <number-block
          v-for="(number, index) in lastNum"
          :key="number"
          :number="number"
          @click="onClickBlock"></number-block>
      </div>

      <div class="right-area">
        <div class="person-list">
          <div class="person-item" v-for="(person, key, index) in personList" :style="{color: person.color}">
            <span class="color" :class="{'anim-flash': person.canNewSaying()}" :style="{backgroundColor: person.color}"></span>
            <span class="username">{{ person.username }}</span>
          </div>
        </div>
      </div>

      <div class="warn-floater">
        <span class="fadeIn" v-for="(text, key, index) in warnList">{{ text }}</span>
      </div>

    </div>

    <div class="game-result float-on-top" v-if="!!loserKey">
      <dialog-modal :title="getMyselfName() !== loserKey ? '哈哈哈 赢了' : '喔豁 输了'" @close="$router.push('/')">
        <div>
          <div>最后一个数：{{ lastNum }}</div>
          <div>每次最多说：{{ perMax }}</div>
          <br/>
          <div v-for="(person, key, index) in personList" :style="{color: person.color}">{{ person.username }} - {{ (person.username !== loserKey) ? '赢了' : '输了' }}</div>
        </div>
      </dialog-modal>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from "vuex"
import DialogModal from "../components/DialogModal"
import ChangeUserInfo from "../components/ChangeUserInfo"
import NumberBlock from "../components/NumberBlock"
import Person from "../js/Person"

export default {
  created () {
    let person = new Person(this, this.getMyselfName(), '#0083ff')
    person.setOnMe((person) => {
      person.newSaying()
    })

    // 机器人宝典
    let robotMaps = ((lastNum, perMax) => {
      let map = []

      let times = parseInt(lastNum / (perMax+1)) // 运算次数
      for (let n = times; n >= 0; n--) {
        map.push(lastNum - 1 - (perMax+1) * n)
      }
      _.remove(map, (el) => (el <= 0)) // 删除开头的 0

      return map
    })(this.lastNum, this.perMax)

    console.log('机器人宝典：', robotMaps)

    let personRobot = new Person(this, '机器人', '#f73939')
    personRobot.setOnMe((person) => {
      console.log(`我是 ${person.username}，现在该我 bb 了`)
      person.newSaying()
      setTimeout(() => {
        let needSay = _.filter(robotMaps, (n) => {
          return n > this.nowNum
        })[0]

        let canKeepNumber = (typeof needSay === "number") && (needSay-this.nowNum <= this.perMax)
        if (canKeepNumber) {
          person.setSaying(needSay-this.nowNum)
        } else {
          // 随机
          if ((this.lastNum-this.nowNum) > this.perMax) {
            console.log('机器人随机')
            person.setSaying(_.random(1, this.perMax))
          } else {
            console.log('!!!!!!!!!!!!!最后决战!!!!!!!!!!!!!然而并无x用，robotMaps 有这个数字')
            person.setSaying(this.perMax > 1 ? this.perMax-1 : 1)
          }
        }
      }, _.random(800, 1000))
    })
  },

  components: {DialogModal, ChangeUserInfo, NumberBlock},
  props: {
    lastNum: {
      type: Number
    },
    perMax: {
      type: Number
    }
  },
  data () {
    return {
      personList: {},
      sayingList: [],
      nowNum: 0,
      nowPersonKey: null,
      numberBlockColorList: {},
      loserKey: null,
      warnList: {}
    }
  },
  computed: {
    ...mapGetters({
      getMyselfName: 'getUserName'
    })
  },
  methods: {
    onClickBlock (number, $el, canClick) {
      if (!canClick) {
        this.newWarn('禁止点击')
        console.log('[禁止点击]', $el)
        return
      }
      this.getMyself().setSaying(number - this.nowNum)

      // scroll To Block Item
      let listElem = $('.number-block-list')
      listElem.animate({scrollTop: $($el)[0].offsetTop - 20}, 500)
    },

    onAfterSetSaying (saying, person) {
      console.log('[发言成功]', saying, person)
      console.log('\n\n\n')

      if (this.nowNum >= this.lastNum) {
        this.loserKey = this.nowPersonKey
      }

      if (this.loserKey === null) {
        // 如果没有 loser
        this.setNextPerson()
      }
    },

    setNextPerson () {
      console.log('设置为下一个用户')
      let personListKeys = _.keys(this.personList)
      let nextKey = personListKeys[_.indexOf(personListKeys, this.nowPersonKey) + 1];
      this.nowPersonKey = !!nextKey ? nextKey : personListKeys[0]
    },

    getMyself () {
      return this.personList[this.getMyselfName()]
    },

    buildNumberBlockColorList () {
      //console.log('重新构建一次 NumberBlock 颜色表')
      let list = {}

      _.each(this.sayingList, (saying) => {
        if (!saying.range) return
        for (let i = saying.range.start; i <= saying.range.end; i++) {
          list[i] = saying.person.color
        }
      })

      this.numberBlockColorList = list
    },

    newWarn (text) {
      let key = _.size(this.warnList)+1
      Vue.set(this.warnList, key, text)
      setTimeout(() => {
        Vue.delete(this.warnList, key)
      }, 2000)
    }
  },
  watch: {
    nowNum (newVal, oldVal) {
      this.buildNumberBlockColorList()
    },
    nowPersonKey (newPersonKey, oldPersonKey) {
      if (!newPersonKey) return
      console.log(`[newPersonKey 变动] 现在该 ${newPersonKey} 说！`)
      this.personList[newPersonKey].onMe()
    },
    loserKey (loserKey) {
      console.log(`[loserKey 变动] 胜负已定`)
      let result = []
      _.each(this.personList, (person) => {
        result.push({"person": person.username, "result": person.username !== loserKey ? '赢' : '输'})
      })
      console.table(result)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../css/color";

.game-running {
  .game-body {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-items: center;
    flex-flow: row;
    background: #FFF;

    .number-block-list {
      display: flex;
      flex-flow: column;
      padding: 20px 20px;
      height: 100%;
      flex-basis: 35%;
      overflow-y: scroll;
    }

    .right-area {
      display: flex;
      flex: 1;
      height: 100%;
      position: relative;
      overflow: hidden;

      .person-list {
        position: absolute;
        padding: 20px;
        top: 0;
        right: 0;

        .person-item {
          .color {
            padding: 5px;
            display: inline-block;
            vertical-align: middle;
            border-radius: 50%;
            margin-right: 5px;

            &.anim-flash {
              box-shadow: 2px 2px 0 #efefef;
            }
          }

          .username {
            font-size: 13px;
          }
        }
      }
    }

    .warn-floater {
      position: absolute;
      top: 10px;
      left: 35vw;
      right: 35vw;
      width: auto;
      text-align: center;
      pointer-events: none;

      & > span {
        background: #ffc107a6;
        border: 1px solid #ffc107;
        color: #fff;
        text-shadow: 1px 1px #ffc107;
        display: block;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
