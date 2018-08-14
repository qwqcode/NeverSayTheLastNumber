<template>
  <div class="dialog">
    <div class="top">
      <span v-on:click="$emit('close')" class="close-btn" v-if="!hideCloseBtn"><i class="zmdi zmdi-close"></i></span>
    </div>
    <div class="content">
      <h2 class="title" v-if="!!title">{{ title }}</h2>
      <div class="html"><slot></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {default: ''},
      hideCloseBtn: {type: Boolean, default: false}
    }
  }
</script>

<style scoped lang="scss">
@import "../css/color";

.dialog {
  background: #FFF;
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px 0;

  .top {
    display: block;

    .close-btn {
      display: block;
      margin-top: 15px;
      padding-bottom: 0;
      font-size: 2.5em;
      text-align: center;
    }
  }

  .content {
    padding: 0 20px;
    text-align: center;
    display: block;
    font-size: 20px;
    margin-top: 20px;

    .title {
      margin-top: 0;
      margin-bottom: 30px;
    }

    .html {
      margin-top: 10px;
    }
  }

  .dialog-block {
    display: block;

    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }

  button {
    background: transparent;
    border: 1px solid transparent;
    border-bottom-color: #d4d4d4;
    padding: 10px 5px;
    margin-top: 20px;
    color: inherit;
    outline: none;

    &:active {
      color: $main-color;
      border-bottom-color: $main-color;
    }
  }
}
</style>
