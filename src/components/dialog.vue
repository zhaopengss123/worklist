<template>
  <div>
    <!--弹框-->
     <el-dialog :title="title" :visible.sync="isShow" center @close="close">
        <slot name="messageContent"></slot>
        <div slot="footer" class="dialog-footer">
          <slot name="operateBtn"></slot>
        </div>
      </el-dialog>
      <!--弹框-->
  </div>
</template>
<style scoped>

</style>
<script>
export default {
  name: "dialog",
  props: ["mdShow", "title", "refuseShow"],
  data() {
    return {
      isShow: false
    };
  },
  watch: {
    mdShow: function(n, o) {
      this.isShow = this.mdShow; //新增mdShow的watch,监听变更并同步到isShow上
    }
    // isShow(n, o) {
    //   console.log("zujian", n);
    // }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>


