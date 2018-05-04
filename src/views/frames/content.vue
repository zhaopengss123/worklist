<template>
  <div class="container" :class="[menuState]">
    <div><router-view/></div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  computed: {
    menuState () {
      return this.$store.state.MenuStore.menuActive ? 'active' : '';
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@less/global.less';
.container{
  height: 100%;
  padding: @header-height + 20 20px 20px  @menu-width + 20;
  transition: all .25s;
  -webkit-transition: all .25s;
  &.active{
    padding-left: 64px + 20px;
  }
  & > div{
    height: 100%;
    border-radius: 5px;
    overflow-y: auto;
    position: relative;
  }
}
</style>
