<template>
  <div class="game-new">

    <dialog-modal title="新游戏" v-if="!gameStart" @close="$router.push('/')">
      <div class="dialog-block">
        <dialog-input label="最后一个数：" default-value="21" placeholder="例如：21" hint="谁说到这个数字，谁就输" data-key="lastNum" @recall="setData"></dialog-input>
      </div>
      <div class="dialog-block">
        <dialog-input label="每次最多说：" default-value="3" placeholder="例如：3" hint="x 个连续的数字" data-key="perMax" @recall="setData"></dialog-input>
      </div>
      <transition name="fade">
      <div class="dialog-block" v-if="!!inputError">
        <span class="error">输入有误：{{ inputError }}</span>
      </div>
      </transition>
      <div class="dialog-block">
        <button @click="runGame()">开始游戏 <i class="zmdi zmdi-arrow-right" style="margin-left: 10px"></i></button>
      </div>
    </dialog-modal>

    <div v-if="gameStart">
      <change-user-info v-if="!$store.getters.getUserName()" class="float-on-top" @saved=""></change-user-info>
      <game-running v-if="!!$store.getters.getUserName()" :lastNum="Number(lastNum)" :perMax="Number(perMax)"></game-running>
    </div>

  </div>
</template>

<script>
  import DialogModal from '../components/DialogModal'
  import DialogInput from "../components/DialogInput"
  import ChangeUserInfo from '../components/ChangeUserInfo'
  import GameRunning from "../components/GameRunning"

  export default {
    components: {GameRunning, ChangeUserInfo, DialogInput, DialogModal},
    data () {
      return {
        lastNum: 21,
        perMax: 3,

        gameStart: false,
        inputError: ''
      }
    },
    methods: {
      setData (dataKey, val) {
        this[dataKey] = val
      },

      runGame () {
        // 检测输入是否有误
        this.inputError = ''
        if (!this.lastNum || !this.perMax) {
          this.inputError = '请填入数字'
          return
        }

        if (isNaN(this.lastNum) || isNaN(this.perMax)) {
          this.inputError = '只能输入数字'
          return
        }

        if (Number(this.lastNum) < 1 || Number(this.perMax) < 1) {
          this.inputError = '数字不能小于 1'
          return
        }

        if (Number(this.perMax) > Number(this.lastNum)) {
          this.inputError = '每次最多说的数字个数 不能大于 最后一个数'
          return
        }

        this.gameStart = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .error {
    color: #ff5652;
    font-size: 18px;
  }
</style>
