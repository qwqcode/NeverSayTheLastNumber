<template>
  <div class="app" id="app">
    <transition name="fade">
      <router-view class="app-view float-on-top"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    $('.loading-layer').hide()
  }
}
</script>

<style lang="scss">
@import "css/color";

.app {
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 768px;
  min-height: 550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-items: center;
  background: $main-color;
}

.float-on-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
