<template>
  <change-user-info @saved="$router.push('/')" @close="$router.push('/')"></change-user-info>
</template>

<script>
  import ChangeUserInfo from "../components/ChangeUserInfo"

  export default {
    components: {ChangeUserInfo},
  }
</script>

<style scoped lang="scss">
</style>
