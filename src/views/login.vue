<template>
  <div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formModel: {
        userName: "",
        userPwd: ""
      }
    };
  },
  mounted() {
    const userInfo = this.$route.query.userInfo;
    const infoString = userInfo.replace(/\\/g, "");
    console.log(infoString, infoString.indexOf("classType"));
    let userStore;
    if (infoString.indexOf("classType") > -1) {
      userStore = JSON.parse(infoString);
    } else {
      userStore = JSON.parse(infoString.substr(1, infoString.length - 2));
    }

    if (userInfo) {
      console.log(userStore);

      if (userStore.classType) {
        this.$router.push(`/home/buildDetail/${userStore.id}`);
      } else {
        this.$store.commit("setUserInfo", userStore);
        // this.$store.commit('setUserInfo', userInfo)
        this.$router.push("/home/tasklist");
      }
    } else {
      window.location.href = "http://192.168.1.159:8080/";
      //window.location.href = "http://tusercenter.beibeiyue.cn/c/";
      //window.location.href = "http://usercenter.beibeiyue.com/c/";
    }
  }
};
</script>
