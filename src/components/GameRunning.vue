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
import Game from '../js/game'
export default Game
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
