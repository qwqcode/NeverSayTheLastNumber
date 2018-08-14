<template>
  <div class="game-rules">
    <dialog-modal title="游戏规则" @close="$router.push('/')">
      <div v-html="rulesText"></div>
    </dialog-modal>
  </div>
</template>

<script>
  import DialogModal from '../components/DialogModal'

  export default {
    components: {DialogModal},
    data () {
      return {
        rulesText: `每位玩家依次<b>连续地</b>说<b>一个或多个</b>数字<br/><br/>说到<b>最后一个数字</b>的玩家输，其余玩家赢`
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
