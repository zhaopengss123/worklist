<template id="com-dialog" >
  <div class="task-detail">
    <div class="quote-title">工单详情  {{ detailData.sendee }}</div>
    <!--基本信息-->
    <el-form :inline="true" ref="form1" :rules="rules" :model="form1" label-width="100px">
     <el-card class="box-card box-card-bot">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <el-button v-show="detailData.personUpdate == true && detailData.status == 0 || detailData.personUpdate == true && detailData.status == 2 " style="float: right; padding: 3px 0" type="text" @click="eidtFun($route.params.id)">编辑</el-button>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="工单名称">
          {{ detailData.name }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工单类别">
          <router-link :to="'/home/projectdetails/0'">{{ detailData.projectName }}</router-link>
          </el-form-item>
        </el-col>
         <el-col :span="8">
          <el-form-item label="工单状态">
             {{ detailData.status == 1 ? '进行中' : detailData.status == 2 ? '拒绝' : detailData.status == 3 ? '完成' : detailData.status == 5 ? '已关闭' : '待处理' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="工单接收人">
          {{ detailData.receptionName }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工单发起人">
          {{ detailData.userName }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            {{ detailData.createTime | format}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="期望完成时间">
           {{ detailData.expectTime | format}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际完成时间">
            {{ detailData.completeTime | format}} 
          </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20" >
        <el-col :span="2" style="width:100px;text-align: right;color: #99a9bf;font-size: 14px; padding-right:0">工单描述</el-col>
        <el-col :span="20"><div class="desText" style="font-size: 14px;" v-html="detailData.describeContext "></div></el-col>
      </el-row>
       <el-row :span="24" >
          <el-form-item label="附件" >
              <p v-for="(list, fileIndex) in uploadFileUrl" :key="fileIndex" class="down-btn">
                <span v-show="list.indexOf('png') >=0 || list.indexOf('jpg') >=0">
                    <a v-bind:href="list" target="_blank"><img v-bind:src="list" @click="imgFn(list)"></a><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('pptx') >=0 ">
                    <img src="../../../static/images/ppt.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('rar') >=0 ">
                    <img src="../../../static/images/zip.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('xlsx') >=0 ">
                    <img src="../../../static/images/excel.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span>
                <span v-show="list.lastIndexOf('docx') >=0 ">
                    <img src="../../../static/images/word.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span>
                <span v-show="list.lastIndexOf('pdf') >=0 ">
                    <img src="../../../static/images/pdf.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
              
              </p>
          </el-form-item>
      </el-row>
    </el-card>
    <!--操作-->
    <el-card class="box-card box-card-bot">
      <div slot="header" class="clearfix">
        <span>操作</span>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="工单操作" v-show="detailData.status == 0 && detailData.personOper == true ">
            <el-button type="success" plain size="small" icon="el-icon-success" @click="apllyAct" v-if="apllyFlag">接受</el-button>
            <el-button type="info" plain size="small" icon="el-icon-error" @click="rejectAct" v-if="rejectFlag">拒绝</el-button>
            <el-button type="warning" plain size="small" icon="el-icon-refresh"  @click="handRound" v-if="handFlag">转给同事</el-button>
            <span  v-if="apllyTxtFlag" class="successTxt">{{ operationEvent.text }}</span>
          </el-form-item>
          <el-form-item label="工单操作" v-show=" detailData.personOper == false ">
            {{ detailData.status == 1 ? '进行中' : detailData.status == 2 ? '拒绝' : detailData.status == 3 ? '完成' : '待处理' }}
          </el-form-item>
           <el-form-item label="工单操作" v-show="detailData.personOper == true &&  detailData.status != 0">
              <span class="successTxt">{{  detailData.status == 1 ? '已接受' : detailData.status == 2 ? '已拒绝' : detailData.status == 3 ? '已完成': '待处理'}}</span>
           </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="拒绝理由" v-show="detailData.status == 2 " style="width:500px;min-height:130px;" >
               <el-input
                type="textarea"
                :rows="6"
                placeholder=""
                v-model="textareaRemark"
                :disabled="true">
              </el-input>
          </el-form-item>
          <el-form-item label="完成描述" v-show="detailData.status != 2 ">
            <div v-show=" detailData.personOper == false && detailData.status != 3 && detailData.status != 2" style="width:500px;min-height:130px;">
               <el-input
                type="textarea"
                :rows="6"
                placeholder="对方完成工单并编辑后, 方可在此显示"
                v-model="textarea"
                :disabled="true">
              </el-input>
            </div>
             
            <div v-show="detailData.personOper == true && detailData.status == 1 || detailData.status == 3" style="width:500px;min-height:130px;">
               <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入描述"
                v-model="missionCompleteDescribe"
                :disabled='flagText'
                >
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件记录" 
           v-show="detailData.personOper == true && detailData.status == 1">
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
        </el-col>

         <el-col :span="24" >
           <el-form-item label="文件记录" v-show="detailData.personOper == false && listData.length == 0 && detailData.status == 3 || detailData.personOper == true && listData.length == 0 && detailData.status == 3">
              未上传
          </el-form-item>
          <el-form-item label="文件记录" v-show="listData.length > 0" >
              <p v-for="(list, fileIndex) in listData" :key="fileIndex" class="down-btn">
                <span v-show="list.indexOf('png') >=0 || list.indexOf('jpg') >=0">
                  <a v-bind:href="list" target="_blank"><img v-bind:src="list" @click="imgFn(list)"></a><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('pptx') >=0 ">
                    <img src="../../../static/images/ppt.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('rar') >=0 "> 
                    <img src="../../../static/images/zip.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
                <span v-show="list.lastIndexOf('xlsx') >=0 ">
                    <img src="../../../static/images/excel.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span>
                <span v-show="list.lastIndexOf('docx') >=0 ">
                    <img src="../../../static/images/word.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span>
                <span v-show="list.lastIndexOf('pdf') >=0 ">
                    <img src="../../../static/images/pdf.png"><em>{{ list.substring(list.lastIndexOf('\/')+1, list.lastIndexOf('.')) }}</em><em>{{ list.substring(list.lastIndexOf('.')) }}</em><a class="downIcon" v-bind:href="list" v-bind:download="list">下载 </a>
                </span> 
              </p>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-show="detailData.personOper == true && detailData.status != 3 && detailData.status != 2 "> 
          <div style="text-align: center;"><el-button type="primary" plain @click="confirmUpload">完成工单</el-button></div>
        </el-col>
      </el-row>
    </el-card>
    <!--任务评价-->
    <el-card class="box-card box-card-bot">
      <div slot="header" class="clearfix">
          评价
        </div>
      <el-form :model="evaluate">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工单评价">
              <span v-show="detailData.personUpdate == false">{{ evaluateForm.appraiseStatus == 0 ? '未评价' :  evaluateForm.radio == 1 ? '满意' : evaluateForm.radio == 2 ? '一般' : evaluateForm.radio == 3 ? '不满意' : ''}}</span>
              <span v-show="detailData.personUpdate == true"> {{ evaluate.radio == 1 ? '满意' : evaluate.radio == 2 ? '一般' : evaluate.radio == 3 ? '不满意' : ' 未评价 '  }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="评价内容">
              {{ evaluate.textarea }} 
              <div v-show="detailData.personUpdate == false && detailData.appraiseStatus == 0" style="min-width: 300px">
                <el-input
                  placeholder="对方填写评价内容后在这里显示～"
                  v-model="input1"
                  :disabled="true">
                </el-input>
              </div>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="detailData.appraiseStatus != 1 && detailData.personUpdate == true && detailData.status != 5"> 
          <el-col :span="24">
            <el-button type="primary" size="small" class="ele-evaluate-btn" @click="evluateFn">立即评价</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!--历史记录-->
    <el-card class="box-card box-card-bot">
      <div slot="header" class="clearfix">
        <span>历史记录</span>
      </div>
      <ul>
        <li v-for="(item, index) in historyData" :key="index">
            {{ item.createTime | format(true) }}, {{ item.logContext }}
        </li>
      </ul>
    </el-card>
    <div class="operateBox">
       <el-button @click="returnFun">返回</el-button>
    </div>
   </el-form>
   <!--立即评价弹框-->
    <el-dialog
      title="评价"
      :visible.sync="mdShow"
      width="30%"
      center>
      <el-form :model="evaluateForm">
          <el-form-item label="工单满意度" :label-width="formLabelWidth">
              <el-radio v-model="evaluateForm.radio" :label="1" icon="el-icon-star-on">满意</el-radio>
              <el-radio v-model="evaluateForm.radio" :label="2" icon="el-icon-success">一般</el-radio>
              <el-radio v-model="evaluateForm.radio" :label="3" icon="el-icon-error">不满意</el-radio>
          </el-form-item>
          <el-form-item label="评价内容" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="evaluateForm.textarea">
              </el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mdShow = false">取 消</el-button>
        <el-button type="primary" @click="appraiseFun">确 定</el-button>
      </span>
    </el-dialog>
    <!--立即评价弹框-->
    <!--拒绝弹框-->
    <el-dialog
      title="拒绝"
      :visible.sync="refuseShow"
      width="30%"
      center>
      <el-form :model="refuseForm" :rules="rules" ref="refuseForm">
          <el-form-item label="备注" :label-width="formLabelWidth" prop="textarea">
            <el-input
              type="textarea" 
              :rows="4"
              placeholder="请输入内容"
              v-model="refuseForm.textarea">
            </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refuseShow = false">取 消</el-button>
        <el-button type="primary" @click="refuseFun('refuseForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--拒绝弹框-->
    <!--转给同事-->
    <el-dialog
      title="转给同事"
      :visible.sync="returnShow"
      width="30%"
      center>
      <el-form :model="returnForm" :rules="returnRule" ref="returnForm">
        <el-form-item label="工单接收人" prop="ascriptionProId" :label-width="formLabelWidth">
          <el-select v-model="returnForm.ascriptionProId" placeholder="请选择" clearable @change="handleChangePro">
            <el-option
              v-for="item in optionsRecipient"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
              :disabled="item.disabled"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="textarea">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="returnForm.textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="returnShow = false">取 消</el-button>
        <el-button type="primary" @click="returnClick('returnForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--转给同事-->
  </div>
</template>
<style lang="less">
.task-detail{
  .el-textarea.is-disabled .el-textarea__inner, .el-input.is-disabled .el-input__inner{
    background-color:#fff;
    color: #5a5e66;
  }
  .down-btn a{
    display:inline-block;
  }
  .down-btn img{
    display:inline-block;
    width:20px;
    margin-right:7px;
    vertical-align: middle;
    border-radius:3px;
  }
  .down-btn em{
    max-width: 157px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  .el-textarea.is-disabled .el-textarea__inner{
    cursor: auto;
  }
  .down-btn .el-button{
    font-size: 12px;
    padding: 5px 10px;
    margin-left: 20px;
  }
  .downIcon{
    font-size: 12px;
    padding: 5px 10px;
    margin-left: 20px;
    color: #409EFF;
    background: #ecf5ff;
    border: 1px solid #d8dce5;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    transition: .1s;
    border-radius: 4px;
  }
  .el-form-item__label{
    color: #99a9bf;
  }
  .quote-title {
    margin-bottom: 20px;
    padding: 12px 15px;
    line-height: 22px;
    border-left: solid 5px #00a2ca;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
  }
  .wrap-detais-content {
    position: relative;
    margin: 50px;
    padding: 15px;
    border: 1px solid #ccc;
  }
  .detail-title-h3 {
    position: absolute;
    width: 100px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    top: -20px;
    left: 20px;
    background: #fff;
  }
  .operateBox {
    text-align: center;
    float: none;
  }
  .box-card-bot {
    margin-bottom: 30px;
  }
  .ele-textarea-width {
    width: 500px;
  }
  .ele-evaluate-btn {
    display: block;
    margin: 20px auto;
  }
  .successTxt {
    color: #67c23a;
  }
  #editable{
    min-width: 500px;
    min-height:200px;
    display: block;
  }
  .el-textarea__inner{
    min-height: 130px;
  }
}
</style>

<script>
export default {
  // components: {
  //   comDialog
  // },
  data() {
    return {
      flagText:false,
      missionCompleteDescribe:'',
      fileUrl:'',
      input1:'',
      pageSize:null,
      pageNo:null,
      flag:false,
      textareaRemark:'',
      rules: {
        textarea:[
          {required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      },
      returnRule:{
        textarea:[
          {required: true, message: '请输入转交原因', trigger: 'blur' }
        ],
        ascriptionProId:[
          {required: true, message: '请选择工单接收人', trigger: 'change',type: 'number' }
        ],
      },
      form1: {
        textarea: ""
      },
      options:[],
      dialogFormVisible: false,
      evaluateForm: {
        textarea: "",
        radio: 2
      },
      detailData:{},
      historyData:[],
      refuseForm: {
        textarea: ""
      },
      returnForm: {
        textarea: "",
      },
      apllyTxtFlag: false,
      apllyFlag: true,
      handFlag: true,
      rejectFlag: true,
      formLabelWidth: "100px",
      mdShow: false,
      refuseShow: false,
      returnShow: false,
      title: ["任务评价", "拒绝此任务", "任务转给同事"],
      paramsData:{},
      operationEvent:{},
      evaluate:{
        textarea:'',
      },
      client:null,
      textarea:'',
      files:null,
      fileName:'',
      fileArr:[],
      fileArrList:[],
      fileString:'',
      uploadFlag: true,
      listData:[],
      localFile:{},
      localFileList:[],
      optionsRecipient:[],
      emailId:'',
      uploadFileUrl:[]
    };
  },
  methods: {
    //查看图片
    imgFn(url){
      console.log(url)
    },
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
       // let key = fileId + '.' + this.fileName;
       let key = this.files.name;
        this.client.multipartUpload(key, this.files, {}).then(res => {
          this.fileUrl = res.url ? res.url : 'http://'+ res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          this.fileArr.push(this.fileUrl)
          console.log(this.fileUrl, this.fileArr)
        }, error => {
          this.prompt('上传文件失败','warning');
        })
    },
    //确定上传
    confirmUpload(){
      this.fileString = this.fileArr.join(',');
      if(this.fileArr.length == 0 && this.missionCompleteDescribe == '' || this.fileArr.length == 0 && this.missionCompleteDescribe == null){
        this.$message.warning(`请至少完成一项`);	
      }else{
        this.uploadFlag = false;
        this.paramsData.missionImg = this.fileString;
        this.paramsData.missionCompleteDescribe = this.missionCompleteDescribe;
        this.recipient();
        //操作状态
        this.paramsData.status = 3;
        // this.detailData.status = 3;
        this.operationEvent.text = '已接受'; 
        this.operation();             
      }
    },
    saveDetailsFn() {  //保存
    },
    evluateFn() {
      if(this.detailData.status != 3){
        this.$message.error('对方完成工单后，才可以评价哦~')
      }else{
        this.mdShow = true;
      }
    },
    //接收人改变  
    handleChangePro(value) {
      this.optionsRecipient.map(item => {
        if(this.detailData.receptionId == value){
          item.disabled = true;
        }
        if(item.userId == value){
         this.paramsData.receptionName = item.userName;
         this.paramsData.receptionId = value;
         
        }
      })
    },
    // 工单接收人
     orderRecipient(){
      this.axios.post('/project/listTransfer', {classId: this.detailData.ascriptionProId }).then(res => {
        this.optionsRecipient = res.data.result;
        this.optionsRecipient.map(item => {
        if(item.userId == this.detailData.receptionId){
            item.disabled = true
          }
        })
      }) 
    }, 
    //接收人邮箱
    emailFn(emailID, emailData){
      console.log(111, emailData,emailID)
       this.axios.post('http://hrs.beibeiyue.com/personage/personageDetail', {id: emailID }).then(res => {
        console.log(res.data)
        emailData.receptionEmail = res.data.result.companyEmail;
        if(emailData == this.paramsData){
          console.log('操作',emailData )
          this.operationEmail(emailData);
        }else{
           console.log('评价',emailData )
           this.appraiseEmail(emailData);
        }
      }).catch(error => {
        console.log('失败')
      }) 
    },
    //操作保存
    operationEmail(paramsData){
       this.axios.post('/mission/missionOperation', { paramJson: JSON.stringify(paramsData) }).then(res => {
        console.log(res.data)
        if(res.data.code == 1000){
          this.$message.success('保存成功');
          if(paramsData.status == 3){
            setTimeout(time => {
              this.$router.push({ path: "/home/tasklist" });
            }, 1000);
          }
        }
      }) 
    },
    //评价保存
    appraiseEmail(paramsData){
      this.axios.post('/mission/missionAppraise', { 
          paramJson: JSON.stringify(paramsData)
      }).then(res => {
         this.prompt('评价成功','success');
         this.evaluateForm.appraiseStatus = 1;
         this.detailData.appraiseStatus = 1;
      }).catch(error => { //捕获失败
      })
    },
    //接收人操作隐藏
    recipient(){
        this.apllyFlag = false;
        this.handFlag = false;
        this.rejectFlag = false;
        this.apllyTxtFlag = true;
    },
    //点击接收
    apllyAct() {
      this.receive();
    },
    //点击拒绝
    rejectAct() {
      this.refuseShow = true;
    },
    //  确定拒绝
    refuseFun(formName){ 
      this.$refs[formName].validate((valid) => {
        if (valid) {
         //操作状态
        this.paramsData.status =2;
        this.detailData.status = 2;
        this.detailData.receptionName = '';
        this.paramsData.remark = this.refuseForm.textarea;
        this.textareaRemark = this.refuseForm.textarea;
        this.operation();
        this.refuseShow = false;
        this.recipient();
        this.operationEvent.text = '已拒绝';
        }else{
          return false;
        }
      });
    },
    //确定转给同事
    returnClick(formName){
        this.$refs[formName].validate((valid) => {
        if (valid) {
          //操作状态
          this.paramsData.status = '0';
          this.detailData.status = '0';
          this.detailData.receptionName = this.paramsData.receptionName;
          this.paramsData.remark = this.returnForm.textarea; 
          this.recipient();
          this.operation();
          this.operationEvent.text = '已转给同事';
          this.returnShow = false;
          setTimeout(time => {
            this.$router.push({ path: "/home/tasklist" });
          }, 1000);
          
        }else{
          return false;
        }
      });
    },
    dialogClose() {
      console.log("从子组件接收到的关闭消息");
      this.mdShow = false;
      this.refuseShow = false;
      this.returnShow = false;
    },
    //转给同事
    handRound() {
      this.returnShow = true;
    },
    //返回列表
    returnFun(){
      this.$router.push({path:'/home/tasklist'})
    },
    //点击编辑
    eidtFun(id){
      this.$router.push({path:'/home/newtaskedit/' + id})
    },
    //确定评价
    appraiseFun(){
      this.mdShow = false; 
      this.evaluate = this.evaluateForm;
     
      let paramsData = {
        id: this.$route.params.id,
        appraiseContext: this.evaluate.textarea,
        satisfaction:this.evaluate.radio,
      }
      this.emailFn(this.detailData.receptionId, paramsData);
    },
    //操作点击事件
    operation(){
      //发起人邮件
      this.paramsData.missionId = parseInt(this.$route.params.id) ;
      this.emailFn(this.detailData.userId, this.paramsData);
    },
    //确定接收
    receive() {
      const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确定接收此任务吗? '),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonLoading = false;
              done();
             // this.apllyAct(); 
              this.recipient();
              //操作状态
              this.paramsData.status = 1;
              this.detailData.status = 1;
              this.operation();
              this.operationEvent.text = '已接受'; 
              //this.uploadImg();
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: '已接受此任务'
          });
        });
    },
    //警告类 提示
    prompt(text, type) {
      this.$message({
        message: text,
        type: type
      });
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

    //任务回显
    getData(){
      let id = this.$route.params.id;
      let paramsId = this.$route.params.id;
      if(paramsId != 0){
        //任务详情回显接口
        this.axios.post('/mission/missionDetail', {
            id: paramsId
        }).then(res => {
          //接收人id
          //发起人id
          this.detailData = res.data.result;
          this.form1.textarea =  res.data.result.appraiseContext;
          let sendee = this.detailData.personUpdate == true ? '发起人' : '';
          this.detailData.sendee = sendee;
          if(res.data.result.satisfaction != null){
            this.evaluateForm.radio = res.data.result.satisfaction;
            this.evaluate.radio = res.data.result.satisfaction;
          }
          this.evaluate.textarea = res.data.result.appraiseContext;
          this.imgSrc = res.data.result.missionImg;
          this.evaluateForm.appraiseStatus = res.data.result.appraiseStatus;
          this.textareaRemark = res.data.result.remark;
         
          if(res.data.result.missionImg && res.data.result.missionImg != null){
            this.listData =  res.data.result.missionImg.split(",");
          }
          if(res.data.result.uploadFileUrl && res.data.result.uploadFileUrl != null){
            this.uploadFileUrl =  res.data.result.uploadFileUrl.split(",");
          }
          this.missionCompleteDescribe = res.data.result.missionCompleteDescribe;
          if(this.detailData.status == 3){
            this.flagText = true;
          }else{
            this.flagText = false;
          }
          if(this.detailData.personUpdate == true && this.detailData.personOper == true && this.detailData.status == 0){
             this.rejectFlag = false
          }

          this.orderRecipient();
        }).catch(error => { //捕获失败
        })
        //历史记录回显
        this.axios.post('/mission/historyLog', {
            correlateId: paramsId,
            pageNo: 1,
            pageSize: 50
        }).then(res => {
          this.historyData = res.data.result.list;
        }).catch(error => { //捕获失败
            this.prompt('网络连接失败,请稍后再试','warning');
        })
      };
    },
  },
   mounted(){
    this.getData();
  },
  //路由监听
  watch:{
    "$route.params.id": "getData"
  },
};
</script>
