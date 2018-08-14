<template>
  <div class="change-user-info">
    <dialog-modal title="WHO R U" :hide-close-btn="needHideCloseBtn" @close="$emit('close')">
      <div class="dialog-block">
        <dialog-input label="你的名字：" data-key="username" @recall="setData" :default-value="getUserName()" ref="username"></dialog-input>
      </div>
      <div class="dialog-block">
        <button @click="save()">保存 <i class="zmdi zmdi-check" style="margin-left: 10px"></i></button>
      </div>
    </dialog-modal>
  </div>
</template>

<script>
  import DialogModal from "./DialogModal"
  import DialogInput from "./DialogInput"
  import { mapGetters } from "vuex"

  export default {
    components: {DialogInput, DialogModal},
    data () {
      return {
        username: null
      }
    },
    methods: {
      setData (dataKey, val) {
        this[dataKey] = val
      },
      save () {
        if (!this.username) {
          $(this.$refs.username.$el).find('input').focus()
          return
        }

        this.$store.commit('setUserName', this.username)
        this.$emit('saved')
      }
    },
    computed: {
      needHideCloseBtn () {
        return !this.getUserName()
      },
      ...mapGetters([
        'getUserName'
      ])
    },
    mounted () {
      this.username = this.getUserName()
    }
  }
</script>

<style scoped lang="scss">
@import "../css/color";

.change-user-info {

}
</style>
