<template>
  <div class="el-content task-edit">
    <div class="quote-title">{{this.$route.params.id == 0 ? '新建' : '编辑'}}工单</div>
    <div class="formWrap">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="工单类别" prop="projectID">
            <div style="width:350px" class="inputLen">
              <el-cascader
                placeholder="请选择"
                v-model="form.projectID"
                change-on-select
                :options="proOptions"
                :props="{value:'value', label:'label', children: 'children'}" 
                @change="proOptionFn"
              ></el-cascader>
            </div>
        </el-form-item>
        <el-form-item label="工单名称" class="inputBox" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="form.expectTimeStart" label="期望开始时间" prop="expectTime">
             <el-date-picker
              v-model="form.expectTimeStart"
              type="date"
              placeholder="选择日期"
              :picker-options="datePick"
              @change="getTimeData" >
            </el-date-picker>
        </el-form-item>

        <el-form-item label="期望完成时间" prop="expectTime">
             <el-date-picker
              v-model="form.expectTime"
              type="date"
              placeholder="选择日期"
              :picker-options="datePick"
              @change="getTimeData" >
            </el-date-picker>
        </el-form-item>
        
        <el-form-item label="工单接收人" prop="receptionId">
            <el-select v-model="form.receptionId" placeholder="请选择" clearable @change="handleChangePro">
              <el-option
                v-for="item in optionsRecipient"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>  
        </el-form-item>
        <el-form-item label="工单描述">
          <quill-editor  ref="myQuillEditor" v-model="form.describeContext" 
              @change="onEditorChange($event)">  
          </quill-editor>  
        </el-form-item>
        <el-form-item label="附件">
          <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="upLoadPro"
              :multiple="false"
              :limit="5"
              :file-list="fileArrList"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传5个文件</div>
            </el-upload>  
        </el-form-item>
        <el-col :span="24" class="operateBox">
          <el-form-item>
            <el-button type="primary" @click="saveTaskInfor('form')">提交</el-button>
            <el-button class="blockButton" @click="$router.push({ path:'/home/tasklist', query:{'pageSize': 10, 'pageNo': 1} })">
              <!-- <router-link to="/home/tasklist" class="linkSame">返回</router-link> -->
              返回
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>
<style lang='less'>
.task-edit{
  .el-cascader{
    min-width:300px;
  }
  .inputLen .el-input{
    width:350px;
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
  .ql-container{min-height: 200px}
  .ql-toolbar  .ql-formats:last-child{
      display: none;
  }
  
}
</style>
<script>
import { quillEditor } from 'vue-quill-editor'
import {formatDate} from '../../lib/date'
export default {
  components: {  
    quillEditor  
  },
  data() {
    return {
      content:'',
      form: {
        expectTime:"",
      },
      datePick:{
        disabledDate(time){
           return new Date(time).getTime() < Date.now() - 8.64e7;
        }
      },
      value: "",
      recipientFlag: false,
      classId:null,
      //添加工单测试数据
      proOptions:[],
      //测试接收人
      optionsRecipient: [],
      rules: {
        projectID:[
          {
            type: "array",
            required: true,
            message: "请选择工单类别",
            trigger: "change"
          }
        ],
        receptionId: [
          {
            type: "number",
            required: true,
            message: "请选择工单接收人",
            trigger: "change"
          }
        ],
        name: [
          { required: true, message: "请输入工单名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        expectTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
      },
      fileName:'',
      fileArr:[],
      fileArrList:[],
      fileString:'',
      uploadFlag: true,
      listData:[],
      localFile:{},
      localFileList:[],
      
    };
  },
  computed: {  
    editor() {  
      return this.$refs.myQuillEditor.quill  
    },
    roleState () {
      return this.$store.state.LoginStore.userInfo.roleState;
    }  
  }, 
  methods: {
    /*文件*/
     //删除文件列表
    handleRemove(file, fileList) {
      this.fileArrList = fileList;
      this.fileArr.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileArr.splice(index,1); 
        }
      })
    },
    handlePreview(file) {

    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件`);
    },
     //上传文件
    upLoadPro(file,fileList){
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf' || this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'RAR'){
        this.flag = true;
        this.fileArrList = fileList;
        this.upLoadKey(file.uid, file.name);
      }else{
        this.flag = false;
        this.fileArrList =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`); 
      }
      console.log(this.fileArrList)
    },
    upLoadFile(fileId, fileListName){
      console.log(this.files)
       let key = this.files.name;
        this.client.multipartUpload(key, this.files, {}).then(res => {
          this.fileUrl = res.url ? res.url : 'http://'+ res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          this.fileArr.push(this.fileUrl)
          console.log(this.fileArr)
        }, error => {
          this.prompt('上传文件失败','warning');
        })
    },
    //获取阿里云key
    upLoadKey(fileId, fileName){
      var bucket = 'ylbb-business';
      var region = 'oss-cn-beijing';   //申请oss服务时的区域
      // let files, effectFiles, effectName;
      /*获取阿里云数据*/
      this.axios.post('http://oss.beibeiyue.com/oss/getOSSToken',  { type: 1 
      }).then(res => { 
        if(res.data.result == 0){
          var creds = res.data.data; 
            this.client = new OSS.Wrapper({
              region: region,
              accessKeyId: creds.accessKeyId,
              accessKeySecret: creds.accessKeySecret,
              stsToken: creds.securityToken,
              bucket: bucket
            });
        }else{
          $scope.$emit('prompt', {text: '获取key失败'})
        }
        this.upLoadFile(fileId, fileName);
      }).catch(error => { //捕获失败
          this.prompt('网络连接失败,请稍后再试','warning');
      })
    },
    // 编辑器文本发生变化
     onEditorChange({ editor, html, text }) {
      this.content = html;
    },
    //成功提示
     successFun(text) {
        this.$message({
          message: text,
          type: 'success',
          duration: 800
        });
      },
    //时间赋值
    getTimeData(val){ 

    },
    // 工单类别改变事件
    proOptionFn(val){
      this.classId =  val[val.length-1];  //获取类别id
      this.orderRecipient();  //请求接收人列表
      this.form.projectidLogic = val.join(',');
      let lengthData = this.form.projectID;
      if(this.$route.params.id != 0 || this.form.receptionId ){
        this.form.receptionId = '';
      }
      this.form.ascriptionProId = lengthData[lengthData.length - 1];
    },
    //保存表格信息
    saveTaskInfor(formName) {
      console.log(this.fileArr.join(','))
      if(this.form.expectTime == null){
        delete this.form.expectTime;
      }
      if(this.form.expectTimeStart){
        let date = new Date(this.form.expectTimeStart);
        let y = 1900+date.getYear();
        let m = date.getMonth()+1;
        let d = date.getDate();
        m = m<10?'0'+m:m;
        d = d<10?'0'+d:d;
        let time = y+m+d;
        this.form.expectTimeStart = "";
      }
      console.log(new Date(this.form.expectTimeStart));
      return false;
     // 拒绝状态 编辑, 再次保存  让状态变为待处理
     if(this.form.status == 2){
       this.form.status = '0';   
     }
      this.$refs[formName].validate(valid => {
        let paramsId = this.$route.params.id;
        let id = this.$route.query.id;
        if (valid) {
          let url = paramsId != 0 ? '/mission/missionEdit' : '/mission/add'; 
          let newForm = this.form;
          newForm.uploadFileUrl = this.fileArr.join(',');
          newForm.expectTime = formatDate(this.form.expectTime); 
              console.log(newForm)
          this.axios.post(url, {
             paramJson: JSON.stringify(newForm)
          }).then(res => {
            
            this.$message.success('保存成功');
            if(res.data.info == '操作成功'){
                setTimeout(time => {
                this.$router.push({ path: "../tasklist", });
              }, 1000);
            } 
            }).catch(error => { //捕获失败
                
            })
        } else {
          return false;
        }
      }); 
    },
    //接收人改变  
    handleChangePro(value) {
      this.optionsRecipient.map(item => {
        if(item.userId == value){
          this.form.receptionName = item.userName;
         // this.emailFn(item.userId);
        }
      })
    },
    // 工单接收人
    orderRecipient(){
      this.axios.post('/project/listPersonByClassId', {classId: this.classId }).then(res => {
        this.optionsRecipient = res.data.result;
      }) 
    },
    //接收人邮箱
    emailFn(emailID){
       this.axios.post('http://hrs.beibeiyue.com/personage/personageDetail', {id: emailID }).then(res => {
        this.form.receptionEmail = res.data.result.companyEmail;
      }) 
    }, 
  },
  mounted() {
    let paramsId = this.$route.params.id;
    //工单类别
    this.axios.post('/project/parentProjectList', {}).then(res => {
      let projectList = res.data.result;
        for(let i =0; i<projectList.length; i++){
            if(projectList[i].children.length<1){
              delete projectList[i].children;
            }else{
                    for(let ii=0; ii<projectList[i].children.length; ii++){
                        if(projectList[i].children[ii].children.length<1){
                          delete projectList[i].children[ii].children;
                        }else{
                              for(let iii = 0; iii<projectList[i].children[ii].children.length; iii++){
                                  if(projectList[i].children[ii].children[iii].children.length<1){
                                        delete projectList[i].children[ii].children[iii].children;
                                  }else{
                                      for(let iiii = 0; iiii<projectList[i].children[ii].children[iii].children.length; iiii++){
                                        if(projectList[i].children[ii].children[iii].children[iiii].children.length<1){
                                          delete projectList[i].children[ii].children[iii].children[iiii].children;
                                        }
                                      }
                                  }
                              }
                        }
                    }
            }
           }
            this.proOptions = projectList; 
    }).catch(error => { //捕获失败
    })
  
    //编辑任务回显
    if(paramsId != 0){
 
      //回显数据
      this.axios.post('/mission/missionDetail', {id:paramsId}).then(res => {
       let projectidArray = res.data.result.projectidLogic.split(",");

        let array = [];
        projectidArray.map(listItem=>{
            array.push(parseInt(listItem));
            
        })
      
        //console.log(projectidArray);
        res.data.result.projectID = array;  
        this.form =  res.data.result;
        if(res.data.result.expectTime){
          this.form.expectTime = new Date(res.data.result.expectTime);
        }
        this.optionsRecipient = [
          {
            userId:res.data.result.receptionId,
            userName:res.data.result.receptionName
          }
        ]; 
        if(this.form.ascriptionProId){
          this.classId = this.form.ascriptionProId;
          //工单接收人
          this.orderRecipient();
        }
        //归属项目回显对应字段
        if(res.data.result.projectidLogic){
          let projectArrList = res.data.result.projectidLogic.split(",");
          let projectIDArr = [];
          projectArrList.map(item => {
            item = parseInt(item);
            projectIDArr.push(item)
          })
          this.form.projectID = projectIDArr;
        }
      }).catch(error => { //捕获失败
          
      })
    }
  }
};
</script>






