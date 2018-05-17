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
    let userStore;
    console.log(infoString);
    if (infoString.indexOf("classType") > -1) {
      userStore = JSON.parse(infoString);
    } else {
      try {
        userStore = JSON.parse(infoString.substr(1, infoString.length - 2));
      } catch (error) {
        userStore = JSON.parse(infoString);
      }
    }
    if (userInfo) {
      if (userStore.classType) {
        this.$router.push(`/home/buildDetail/${userStore.id}`);
      } else {        
        this.$store.commit("setUserInfo", userStore);
        console.log(userStore);
        if(userStore.menueSource==1){
            this.$router.push("/home/launchWork/11");
        }else if(userStore.menueSource==5){
            this.$router.push("/home/receiveWork/11");
        }else if(userStore.typeCode){

            this.$router.push(`/home/taskdetais/${userStore.id}`);
        }else{
            this.$router.push("/home/tasklist");
        }



      }
    } else {
      window.location.href = "http://192.168.1.159:8080/";
      //window.location.href = "http://tusercenter.beibeiyue.cn/c/";
      //window.location.href = "http://usercenter.beibeiyue.com/c/";
    }
  }
};
</script>
