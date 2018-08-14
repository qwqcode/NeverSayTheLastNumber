<template>
  <div class="top-bar">
    <div class="item username" v-if="!!getUserName()" @click="$router.push('/user-info')"><i class="zmdi zmdi-account"></i><span>{{ getUserName() }}</span></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getUserName'])
    }
  }
</script>

<style scoped lang="scss">
.top-bar {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #0083ff;
  padding: 3px 13px;

  .item {
    display: inline-block;
    font-size: 13px;
    color: #FFF;

    & > i {
      margin-right: 10px;
    }

    &:not(:last-child) {
      margin-right: 5px;
      padding-right: 5px;
      border-right: 1px solid #F4F4F4;
    }
  }
}
</style>
