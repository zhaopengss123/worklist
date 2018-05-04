<template>
  <div class="box">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  background: #f8f8f8;
  overflow: hidden;
  position: relative;
}
</style>
