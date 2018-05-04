<template>
  <div class="el-content task-edit">
    <div class="quote-title">编辑工单</div>
    <div class="formWrap">
      <el-form :model="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="合同编号" class="inputBox" >
          <el-input v-model="baseInfoData.contractNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" class="inputBox" >
          <el-input v-model="baseInfoData.storeName" :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="联系人" class="inputBox" >
          <el-input v-model="baseInfoData.contractName" :disabled="true"></el-input>
        </el-form-item>
        
         <el-form-item label="工单类别" class="inputBox" >
          <el-input v-model="form.projectName" :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="工单类别" >
            <div style="width:350px" class="inputLen">
              <el-cascader
                placeholder="请选择"
                v-model="form.projectID"
                change-on-select
                :options="proOptions"
                :props="{value:'pid', label:'projectName', children: 'children'}" 
                :disabled="true"
              ></el-cascader>
            </div>
        </el-form-item> -->
        <el-form-item label="工单接收人">
            <el-select v-model="form.receptionId" placeholder="请选择" @change="handleChangePro">
              <el-option
                v-for="item in optionsRecipient"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>  
        </el-form-item>
        <el-form-item label="期望完成" width="150" prop="timeList">
            <el-date-picker
              v-model="timess" 
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="datePick"
              @change="gettimeList"
              >
            </el-date-picker>
          </el-form-item>
        <el-form-item label="工单描述">
          <quill-editor  ref="myQuillEditor" v-model="form.describeContext" 
              @change="onEditorChange($event)">  
          </quill-editor>  
        </el-form-item>
        <el-col :span="24" class="operateBox">
          <el-form-item>
            <el-button type="primary" @click="saveTaskInfor('form')">确定</el-button>
            <el-button class="blockButton" @click="cancelFn">取消 </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>
<style lang='less'>
.task-edit {
  .el-cascader {
    min-width: 300px;
  }
  .inputLen .el-input {
    width: 350px;
  }
  .quote-title {
    margin-bottom: 20px;
    padding: 12px 15px;
    line-height: 22px;
    border-left: solid 5px #00a2ca;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
  }
  .formWrap .inputBox {
    width: 400px;
  }
  .formWrap .selectBox {
    width: 300px;
  }
  .operateBox {
    text-align: center;
    float: none;
  }
  .blockButton span {
    display: block;
    width: 100%;
    height: 100%;
  }
  .ql-container {
    min-height: 200px;
  }
  .ql-toolbar .ql-formats:last-child {
    display: none;
  }
}
</style>
<script>
import { quillEditor } from "vue-quill-editor";
import { formatDate } from "../../lib/date";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      form: {
        timeList: []
      },
      baseInfoData: {},
      datePick: {
        disabledDate(time) {
          return new Date(time).getTime() < Date.now() - 8.64e7;
        }
      },
      value: "",
      recipientFlag: false,
      classId: null,
      //添加工单测试数据
      proOptions: [],
      //测试接收人
      optionsRecipient: [],
      fileName: "",
      fileArr: [],
      fileArrList: [],
      fileString: "",
      uploadFlag: true,
      listData: [],
      localFile: {},
      localFileList: [],
      rules: {
        timeList: [
          {
            type: "array",
            required: true,
            message: "请选择期望时间",
            trigger: "change"
          }
        ]
      },
      timess: []
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    roleState() {
      return this.$store.state.LoginStore.userInfo.roleState;
    }
  },
  methods: {
    // 编辑器文本发生变化
    onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    //成功提示
    successFun(text) {
      this.$message({
        message: text,
        type: "success",
        duration: 800
      });
    },
    //时间赋值
    gettimeList(val) {
      console.log(val);
      this.form.timeList = val;
      console.log(this.form.timeList);
    },

    //保存表格信息
    saveTaskInfor(formName) {
      if (this.form.expectTime == null) {
        delete this.form.expectTime;
      }
      // 拒绝状态 编辑, 再次保存  让状态变为待处理
      if (this.form.status == 2) {
        this.form.status = "0";
      }
      this.$refs[formName].validate(valid => {
        let paramsId = this.$route.params.id;
        let id = this.$route.query.id;
        if (valid) {
          let url = paramsId != 0 ? "/mission/missionEdit" : "/mission/add";
          let newForm = this.form;
          console.log(newForm);
          let timeStart = this.form.timeList;
          newForm.expectTimeStart = formatDate(timeStart[0]);
          newForm.expectTime = formatDate(timeStart[1]);
          this.axios
            .post(url, {
              paramJson: JSON.stringify(newForm)
            })
            .then(res => {
              console.log(newForm);
              console.log(res.data);
              if (res.data.info == "操作成功") {
                this.$message.success("保存成功");
                setTimeout(time => {
                  this.$router.push({ path: "../tasklist" });
                }, 1000);
              } else if (res.data.code == "1008") {
                this.$message({
                  message: res.data.info,
                  type: "warning",
                  duration: 800
                });
              }
            })
            .catch(error => {
              //捕获失败
            });
        } else {
          return false;
        }
      });
    },
    //接收人改变
    handleChangePro(value) {
      this.optionsRecipient.map(item => {
        if (item.userId == value) {
          this.form.receptionName = item.userName;
          //this.emailFn(item.userId);
        }
      });
    },
    // 工单接收人
    orderRecipient() {
      this.axios
        .post("/project/listPersonByClassId", { classId: this.classId })
        .then(res => {
          this.optionsRecipient = res.data.result;
        });
    },
    //接收人邮箱
    emailFn(emailID) {
      this.axios
        .post("http://hrs.beibeiyue.com/personage/personageDetail", {
          id: emailID
        })
        .then(res => {
          this.form.receptionEmail = res.data.result.companyEmail;
        });
    },
    //取消编辑
    cancelFn() {
      this.$router.go(-1);
    }
  },
  mounted() {
    let paramsId = this.$route.params.id;
    //工单类别
    this.axios
      .post("/project/parentProjectList", {})
      .then(res => {
        let resultData = res.data.result;
        const dataFn = (arr, id) => {
          arr.map((val, index) => {
            if (val.children) {
              dataFn(val.children);
            }
            if (val.pid == 20 || val.pid == 21 || val.pid == 145) {
              val.disabled = true;
            }
          });
        };
        dataFn(resultData[0].children);
        this.proOptions = resultData[0].children;
      })
      .catch(error => {
        //捕获失败
      });

    //编辑任务回显
    if (paramsId != 0) {
      //回显数据
      this.axios
        .post("/mission/missionDetail", { id: paramsId })
        .then(res => {
          this.form = res.data.result;
          this.baseInfoData = JSON.parse(res.data.result.baseInfo);
          if (res.data.result.expectTime && res.data.result.expectTimeStart) {
            //this.form.expectTime = new Date(res.data.result.expectTime);
            //this.form.timeList = [new Date(res.data.result.expectTimeStart), new Date(res.data.result.expectTime)]
            this.timess = [
              new Date(res.data.result.expectTimeStart),
              new Date(res.data.result.expectTime)
            ];
            this.form.timeList = this.timess;
          }
          this.optionsRecipient = [
            {
              userId: res.data.result.receptionId,
              userName: res.data.result.receptionName
            }
          ];
          if (this.form.ascriptionProId) {
            this.classId = this.form.ascriptionProId;
            //工单接收人
            this.orderRecipient();
          }
          //归属项目回显对应字段
          if (res.data.result.projectidLogic) {
            let projectArrList = res.data.result.projectidLogic.split(",");
            let projectIDArr = [];
            projectArrList.map(item => {
              item = parseInt(item);
              projectIDArr.push(item);
            });
            console.log(projectIDArr);
            this.form.projectID = projectIDArr;
          }
        })
        .catch(error => {
          //捕获失败
        });
    }
  }
};
</script>






