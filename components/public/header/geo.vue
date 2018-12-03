<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity"
    >切换城市</nuxt-link>
    [杭州，慈溪，宁波]
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
</style>
