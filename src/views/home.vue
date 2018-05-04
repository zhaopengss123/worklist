<template>
  <div class="box">
    <app-header></app-header>
    <app-menu></app-menu>
    <app-content></app-content>
  </div>
</template>

<script>
import HeaderComponent from "@views/frames/header";
import MenuComponent from "@views/frames/menu";
import ContentComponent from "@views/frames/content";
export default {
  name: "Home",
  computed: {
    userName() {
      return this.$store.state.LoginStore.userInfo.userName || "";
    }
  },
  beforeCreate: function() {
    /* --------------------- 判断用户是否登录 --------------------- */
    let userInfo = window.localStorage.getItem("userInfo") || "";
    /*  let userInfo =  {
      token:'b2072f5d41bc4b42b7ac74cc2b09f9fc',
      userName: '王华',
      userPwd: 123456
    }; */
    if (userInfo) {
      this.$store.commit("setUserInfo", JSON.parse(userInfo));
    } else {
      //window.location.href = "http://192.168.1.159:8080/";
      //window.location.href = 'http://tusercenter.beibeiyue.cn/c/';
      //window.location.href = "http://usercenter.beibeiyue.com/c/";
    }
  },
  components: {
    appHeader: HeaderComponent,
    appMenu: MenuComponent,
    appContent: ContentComponent
  }
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
}
</style>

