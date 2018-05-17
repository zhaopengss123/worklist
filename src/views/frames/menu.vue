<template>
  <div class="menubar" :class="{'active' : menuActive}">
    <el-menu
      default-active="/home/tasklist" 
      @open="handleOpen" 
      router 
      :collapse="menuActive"
      @close="handleClose"
      @select="handSelect"
      >
     <!--  <el-menu-item index="/home/weekly">
        <i class="el-icon-cus-viewgallery"></i>
        <span slot="title">周报</span>
      </el-menu-item> -->
      <el-menu-item index="/home/tasklist">
        <i class="el-icon-cus-category"></i>
        <span slot="title">全部工单</span>
      </el-menu-item>
      <el-submenu index="/home/launchWork" >
        <template slot="title"><i class="el-icon-cus-survey"></i><span slot="title">我发起的工单</span></template>
        <el-menu-item index="/home/launchWork/11">工单列表</el-menu-item>
        <el-menu-item index="/home/launchWork/0">待处理</el-menu-item>
        <el-menu-item index="/home/launchWork/1">进行中</el-menu-item>
        <el-menu-item index="/home/launchWork/3">已完成</el-menu-item>
      </el-submenu>
      <el-submenu index="/home/receiveWork">
        <template slot="title"><i class="el-icon-cus-inquirytemplate"></i><span slot="title">我接收的工单</span></template>
          <el-menu-item index="/home/receiveWork/11">工单列表</el-menu-item>
        <el-menu-item index="/home/receiveWork/0">待处理</el-menu-item>
        <el-menu-item index="/home/receiveWork/1">进行中</el-menu-item>
        <el-menu-item index="/home/receiveWork/3">已完成</el-menu-item>
        <el-menu-item index="/home/taskdetais/1">编辑</el-menu-item>
        <el-menu-item index="/home/Settings">工单设置</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    menuActive () {
      return this.$store.state.MenuStore.menuActive
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handSelect(key, keyPath){
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@less/global.less";
.el-menu {
  height: 100%;
}
.menubar {
  width: @menu-width;
  height: 100%;
  padding-top: @header-height + 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  &.active{
    width: 64px;
  }
  & > div {
    height: 100%;
    overflow-y: auto;
  }
}
.el-submenu__title i,
.el-menu-item i {
  color: #333;
}
.el-menu-item.is-active i {
  color: inherit;
}
</style>
