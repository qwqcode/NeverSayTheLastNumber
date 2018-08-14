<template>
  <div class="number-block"
       :class="{'can-click': canClick}"
       :style="!isClicked ? {color: getColor, borderColor: getColor} : {color: '#FFF', backgroundColor: getColor, borderColor: getColor}"
       @click="$emit('click', number, $el, canClick)">{{ number }}</div>
</template>

<script>
export default {
  data () {
    return {}
  },

  props: {
    number: {required: true}
  },

  computed: {
    canClick () {
      return this.$parent.getMyself().canNewSaying() && (this.number > this.$parent.nowNum && this.number <= this.$parent.nowNum + this.$parent.perMax)
    },

    isClicked () {
      return this.number <= this.$parent.nowNum
    },

    getColor () {
      if (this.isClicked && !!this.$parent.numberBlockColorList[this.number]) {
        return this.$parent.numberBlockColorList[this.number]
      }

      if (this.canClick) {
        return this.$parent.getMyself().color
      }

      return '#d4d4d4'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../css/color.scss";

.number-block {
  $item-default-color: #d4d4d4;
  display: block;
  background: #FFF;
  color: $item-default-color;
  padding: 15px 0;
  width: 100%;
  border: 1px solid $item-default-color;
  text-align: center;
  transition: all .2s ease-in-out;

  &:not(:first-child) {
    margin-top: 20px;
  }

  &:last-child {
    &:before {
      color: #ff5652;
      content: '\f1f4';
      font-family: Material-Design-Iconic-Font;
      margin-right: 5px;
    }
  }
}
</style>
