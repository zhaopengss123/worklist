<template>
  <div class="header">
    <div class="logo" :class="[menuState]"><img src="../../assets/logo.png" alt="logo"></div>
    <div class="menu-bar" @click="menuActive"><i class="el-icon-cus-liebiao"></i></div>
    <!-- user start -->
    <div class="ui-users">
      <div class="ui-user-cell">
        <a href="javascript: void(0);">
          <img src="../../../static/images/default-boy.png" alt="用户头像">
          <span>{{userName.length ? userName : '管理员'}}</span><i class="el-icon-arrow-down"></i>
          <div class="sign-out"  @click="signOut">
            <a href="javascript: void(0);">退出</a>
          </div>
        </a>
      </div>
      <div class="ui-user-message">
        <a href="javascript:;" v-on:mouseenter=" result.notReadMsg =0 ">
          <i class="el-icon-message"></i>
          <span v-if="result.notReadMsg">{{ result.notReadMsg }}</span>  
          <div class="message-item">
            <ul>
              <li v-for="(item, index) in result.list" :key="index">
                <a href="javascript:;">
                  <p>{{ item.createTime | format(true) }}</p>
                  <h4><b>{{ item.userName }}</b><span>{{ item.messageStatus == 1 ? '已接受' : item.messageStatus == 2 ? '已拒绝' : item.messageStatus == 3 ? '已转交' : item.messageStatus == 4 ? '指派了' : '已完成'}}{{item.type == 1 ? '项目': '工单'}}</span><b @click="jumpPage(item.correlateId, item.prepareSheet)">{{ item.context}}</b></h4>
                </a>
              </li>
            </ul>
            <p v-if="!result.list.length">暂无消息</p>
          </div>
        </a>
      </div>
    </div>
    <!-- user end -->
  </div>
</template>
<script>
export default {
  name: "Header",
  mounted() {
    this.axios
      .post("/project/msgCenter", { pageNo: 1, pageSize: 999 })
      .then(res => {
        if (res.data.code == 1000 && res.data.result.list) {
          this.result = res.data.result;
        }
      });
    // setInterval(() => {
    //   this.axios
    //     .post("/project/msgCenter", { pageNo: 1, pageSize: 999 })
    //     .then(res => {
    //       if (res.data.code == 1000 && res.data.result.list) {
    //         this.result = res.data.result;
    //       }
    //     });
    // }, 60000);
  },
  data() {
    return {
      result: {
        list: [],
        notReadMsg: 0
      }
    };
  },
  computed: {
    menuState() {
      return this.$store.state.MenuStore.menuActive ? "active" : "";
    },
    userName() {
      return this.$store.state.LoginStore.userInfo.userName;
    },
    roleState() {
      return this.$store.state.LoginStore.userInfo.roleState;
    }
  },
  methods: {
    signOut() {
      window.localStorage.clear();
      // this.$router.push('/login');
      window.location.href = "http://192.168.1.159:8080/";
      //window.location.href = "http://tusercenter.beibeiyue.cn/c/";
      //window.location.href = "http://usercenter.beibeiyue.com/c/";
    },
    menuActive() {
      this.$store.commit(
        "menuActiveEdit",
        !this.$store.state.MenuStore.menuActive
      );
    },
    //跳转项目或者任务详情
    jumpPage(id, prepareSheet) {
      console.log(prepareSheet);
      if (prepareSheet == true) {
        this.$router.push({ path: "/home/buildDetail/" + id });
      } else {
        this.$router.push({ path: "/home/taskdetais/" + id });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@less/global.less";
.ui-users .message-item li h4 span[data-v-924da402] {
  margin: 0;
}
.header {
  width: 100%;
  height: @header-height;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.logo {
  float: left;
  width: @menu-width;
  padding-left: 24px;
  line-height: @header-height;
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  & > img {
    display: inline-block;
    height: @header-height - 25;
    vertical-align: middle;
  }
  &.active {
    width: 65px;
    overflow: hidden;
  }
}
.menu-bar {
  float: left;
  width: 30px;
  height: 30px;
  color: #5e6d82;
  line-height: 30px;
  text-align: center;
  margin-top: (@header-height - 30) / 2;
  margin-left: (@header-height - 30) / 2;
  cursor: pointer;
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  &:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
}
.ui-users {
  color: #555;
  float: right;
  height: @header-height;
  line-height: @header-height;
  & > div {
    float: right;
    & > a {
      display: block;
      position: relative;
      & > div {
        min-width: 100%;
        padding: 10px 15px;
        font-size: 14px;
        line-height: 1.6;
        background: #fff;
        position: absolute;
        top: @header-height;
        right: 0;
        z-index: 99;
        -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
        opacity: 0;
        visibility: hidden;
        transform: translate3d(0, -20px, 0);
        -webkit-transform: translate3d(0, -20px, 0);
        transition: all 0.25s;
        -webkit-transition: all 0.25s;
      }
      &:hover > div {
        opacity: 1;
        visibility: visible;
        transform: none;
        -webkit-transform: none;
      }
    }
  }
  .ui-user-cell {
    padding-right: 20px;
    padding-left: 10px;
    font-size: 15px;
    cursor: pointer;
    &:hover span {
      color: #626e82;
    }
    img {
      height: 30px;
      border-radius: 50%;
      vertical-align: middle;
    }
    a > img,
    a > span,
    a > i {
      display: inline-block;
      margin-right: 3px;
    }
  }
  .ui-user-message {
    & > a {
      height: @header-height;
      line-height: 65px;
      padding: 0 12px;
      white-space: nowrap;
      i {
        font-size: 20px;
      }
      &:hover i {
        color: #626e82;
      }
    }
    & > a > span {
      display: inline-block;
      padding: 4px;
      min-width: 20px;
      color: #fff;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      background: #f29c37;
      border-radius: 12px;
      position: relative;
      margin-top: -22px;
      margin-left: -13px;
      vertical-align: middle;
    }
  }
  .message-item {
    width: 320px;
    max-height: 400px;
    overflow-y: auto;
    margin-right: -30px;
    & > p {
      margin: 15px 0;
      color: #b4bccc;
      text-align: center;
    }
    li {
      padding: 0 10px 8px;
      border-bottom: solid 1px #ddd;
      transition: all 0.2s;
      -webkit-transition: all 0.2s;
      &:hover {
        background: #f6f6f6;
      }
      a {
        line-height: 1.6;
      }
      p {
        padding: 5px 0;
        color: #999;
        font-size: 12px;
      }
      h4 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        b {
          color: #409eff;
          font-weight: normal;
        }
        span {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>

