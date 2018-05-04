<template>
  <div class="tip">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppTip',
  // props: {
  //   title: {
  //     required: true,
  //     type: String
  //   }
  // }
}
</script>
<style lang="less" scoped>
  .tip{
    padding: 12px 16px;
    color: #5e6d82;
    font-size: 16px;
    font-weight: 400;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin-bottom: 20px;
  }
</style>


