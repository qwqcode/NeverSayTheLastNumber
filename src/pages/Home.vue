<template>
  <div class="home">
    <top-bar></top-bar>
    <div class="top">
      <img class="game-logo" src="../img/logo.svg">
    </div>
    <div class="menu">
      <router-link to="/game-new" class="mode-item" tag="button">人机对战</router-link>
      <router-link to="/" class="mode-item" tag="button">多人对战</router-link>
      <span class="separator"></span>
      <router-link to="/game-rules" class="mode-item" tag="button">游戏规则</router-link>
    </div>
  </div>
</template>

<script>
  import TopBar from "../components/TopBar"
  export default {
    components: {TopBar}
  }
</script>

<style scoped lang="scss">
@import "../css/color";

.home {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;

  .top {
    width: 100%;
    z-index: 2;
    margin-top: 15%;
    pointer-events: none;

    .game-logo {
      opacity: 0.9;
      max-width: 100%;
      height: auto;
    }
  }

  .menu {
    padding: 20% 10%;
    display: block;
    background: #FFF;
    margin-top: -25%;
    transform: rotate(12deg);
    box-shadow: 15px 20px 0 rgba(0, 0, 0, 0.31);

    button {
      display: block;
      width: 100%;
      outline: none;
      padding: 10px 20px;
      background: #FFF;
      color: $main-color;
      border: 1px solid $main-color;
      box-shadow: 3px 3px 0 $main-color;

      &:active {
        background: $main-color;
        color: #FFF;
      }

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .separator {
      display: block;
      padding: 6px 0;
    }
  }
}
</style>
