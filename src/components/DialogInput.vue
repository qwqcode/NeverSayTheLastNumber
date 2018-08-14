<template>
  <div class="dialog-input-group">
    <label>{{ label }}</label>
    <input :type="type" v-model.trim="inputValue" @change="change()" :placeholder="placeholder" ref="input" @focus="isFocus = true" @blur="isFocus = false" />
    <transition name="fade">
      <div class="hint" v-if="!!hint && isFocus"><span>{{ hint }}</span></div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      dataKey: {required: true},
      label: {required: true},
      placeholder: {default: '在此输入'},
      defaultValue: {default: ''},
      hint: {default: ''},
      type: {default: 'text'},
    },
    data () {
      return {
        inputValue: this.defaultValue,
        isFocus: false,
      }
    },
    methods: {
      change () {
        this.$emit('recall', this.dataKey, this.inputValue)
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../css/color";

.dialog-input-group {
  display: block;
  position: relative;

  label {
    display: inline-block;
  }

  input {
    display: inline-block;
    border: 1px solid transparent;
    border-bottom: 1px solid #dadada;
    padding: 5px 10px;
    width: 120px;
    outline: none;

    &:focus {
      border-bottom-color: $main-color;
    }
  }

  .hint {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    font-size: 12px;

    span {
      background: $main-color;
      color: #fff;
      margin: 0 auto;
      padding: 2px 10px;
      border-radius: 2px;
    }
  }
}
</style>
