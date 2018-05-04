<template>
  <div class="el-content tack-list">
    <!-- <app-tip>任务列表</app-tip> -->
    <div class="formQuery clear">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="工单名称">
            <el-input v-model="form.missionName" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
          <el-form-item label="工单类别">
              <div style="width:350px" >
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                   change-on-select
                  :show-all-levels="false"
                  :props="{value:'pid', label:'projectName', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
              </div>
          </el-form-item>
          <el-form-item label="接收人">
            <el-input v-model="form.receptionName" @keyup.enter.native="doLogin"></el-input>
          </el-form-item>
          <el-form-item label="工单状态">
            <el-select v-model="form.missionStatus" placeholder="请选择工单状态" :clearable="true" @change="statudFn">
              <el-option label="待处理" value="0"></el-option>
              <el-option label="进行中" value="1"></el-option>
              <el-option label="已拒绝" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
            </el-select>
    
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="time1" value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际完成" width="150">
            <el-date-picker
              v-model="time2" value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="期望完成" width="150">
            <el-date-picker
              v-model="time3" value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="评价">
            <el-select v-model="form.satisfaction" placeholder="请选择评价" :clearable="true">
              <el-option label="满意" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="不满意" :value="3"></el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div class="operateBox">
          <el-button @click="getData(1)" >查询</el-button>
          <el-button type="primary" @click="onNewAdd">新建</el-button>
      </div>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        stripe
        >
        <el-table-column
          prop="date"
          label="关注"
          >
          <!-- <template slot-scope="scope" ><i :class="{'el-icon-star-off':scope.row.favorite == 0, 'el-icon-star-on': scope.row.favorite == 1}" @click="classToggle(scope.row, scope.row.id)" style="font-size:18px;"  ></i></template> -->
          <template slot-scope="scope" ><i class="font-size-18 curHand" 
            :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
              @click="classToggle(scope.row, scope.row.id)"></i></template>
        </el-table-column>
        <el-table-column
          label="工单名称" prop="mName">
          <template slot-scope="scope"><a class="scopeName" @click="jumpFn(scope.row.id, scope.row.prepareSheet)"> {{  scope.row.mName }}</a></template>
        </el-table-column>
        <el-table-column
          prop="pName"
          label="工单类别">
        </el-table-column>
        <el-table-column
          prop="receptionName"
          label="接收人" >
        </el-table-column>
        <el-table-column
          prop="userName"   
          label="发起人">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">{{scope.row.createTime | format}}</template>
        </el-table-column>
        <el-table-column
          prop="expectTime"
          label="期望完成"><template slot-scope="scope">{{scope.row.expectTime | format}}</template>
        </el-table-column>
        <el-table-column
          prop="completeTime"
          label="实际完成"><template slot-scope="scope">{{scope.row.completeTime | format}}</template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-button plain :type="scope.row.status == 1 ? 'success'  : scope.row.status == 2 ? 'warning' : scope.row.status == 3 ? 'success':'danger'" @click="jumpFn(scope.row.id, scope.row.prepareSheet)">{{ scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '拒绝' : scope.row.status == 3 ? '完成' : scope.row.status == 5 ? '已关闭' :  '待处理' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="评价">
          <template slot-scope="scope">
           {{scope.row.satisfaction == 1 ? "满意" : scope.row.satisfaction == 2 ? "一般" : scope.row.satisfaction == 3 ? '不满意' : '-'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  <!-- 分页 -->
  <app-pagination requestUrl="/mission/listMyMission" @response="getData" :query="form" ref="pagination"></app-pagination>
  </div>
</template>
<style lang="less">
.tack-list{
  .scopeName{
    color: #409EFF;
    cursor:pointer;
  }
  .scopeName:hover{
   text-decoration:underline;
  }
  .curHand{
    cursor: pointer;
  }
  .cell .el-button{
    padding:9px 12px;
  }.cell .el-button{
    padding:9px 12px;
  }
.font-size-18{
   font-size: 18px !important;
 }
 .color-red{
   color: #FA5555;
 }
 .color-blue{
   color: #409EFF;
   &:hover{
     text-decoration: underline;
   }
 }
  .operateBox {
    text-align: center;
    float: none;
    margin-bottom: 40px;
  }
  .line {
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .red {
    color: #f00;
  }
  .font-18 {
    font-size: 22px;
  }
  .el-icon-star-on{color: red;}
    .el-table th>.cell,.el-table td div,.el-table td .cell{
    word-break: keep-all;
  }
}
</style>
<script>
import PaginationComponent from "@/components/pagination";
export default {
  components: {
    appPagination: PaginationComponent
  },
  data() {
    return {
      form: {
        menueSource:1
      },
      time1:[],
      time2:[],
      time3:[],
      tableData: [],
      pageSize:null,
      pageNo:null,
      proOptions:[]
    };
  },
  methods: {
    //状态跳转
    jumpFn(id, category){
      if(category == true){
        this.$router.push({ path: "/home/buildDetail/" + id});
      }else{
        this.$router.push({ path: "/home/taskdetais/" + id});
      }
    },
    //回车事件
    doLogin(ev){
     this.getData();
    },
    // 工单类别改变事件
    proOptionFn(val){
      if(val.length != 0){
        this.form.ascriptionProId = val[val.length-1]
      }else{
        this.form.ascriptionProId = ''
      }
    },
    //状态改变
    statudFn(){

    },
    //新增
    onNewAdd() {
      this.$router.push({ path: "/home/newtaskedit/0"});
    },
    async getData(current) {
      this.loading = true;
     
      if(this.time1 && this.time1 != null){
        this.form.createStart = this.time1[0]
        this.form.createEnd = this.time1[1]  
      }else{
        delete this.form.createStart
        delete this.form.createEnd
      }
     
      if(this.time2 && this.time2 != null){
        this.form.completeStart = this.time2[0]
        this.form.completeEnd = this.time2[1] 
      }else{
        delete this.form.completeStart
        delete this.form.completeEnd
      }
       //期望完成时间
      if(this.time3 && this.time3 != null){
        this.form.expectStart  = this.time3[0]
        this.form.expectEnd = this.time3[1] 
      }else{
        delete this.form.expectStart
        delete this.form.expectEnd
      }
      let res = await this.$refs.pagination.request(current);
      let newArrayleft = [];
      let newArrayList = [];
      res.result.list.map(val => {
        if(val.favorite == 1){
          newArrayleft.push(val)
        }else{
          newArrayList.push(val)
        }
      })
      let data = newArrayleft.concat(newArrayList);
      data.map(item => (item.isActive = false));
      this.tableData = data; 
      this.loading = false;
    },
    //警告类 提示
    prompt(text) {
      this.$message({
        message: text,
        type: 'warning'
      });
    },
    classToggle(row, id) {  //是否关注
      row.favorite = !row.favorite;
      let url = row.favorite == 1 ? '/mission/noticeMission' : '/mission/cancelNoticeMission';
      this.axios.post(url, {
          id: id,
      }).then(res => {
         
      }).catch(error => { //捕获失败
          this.prompt('网络连接失败,请稍后再试');
      }) 
    },
    // 请求数据 
    getDataList(){
      this.form.menueSource = this.$route.params.id == 0 ? 2 : this.$route.params.id == 1 ? 3 : this.$route.params.id == 3 ? 4 : 1;
      if(this.$route.params.id == 11){
        this.form.missionStatus = '';
      }else{
        this.form.missionStatus = this.$route.params.id;
      }
      
      this.getData();
    }
  },
  mounted() {
    this.getDataList();
     //工单类别
    this.axios.post('/project/parentProjectList', {}).then(res => {
      let resultData = res.data.result;
      this.proOptions = resultData[0].children;       
    }).catch(error => {     })
  },
  //路由监听
  watch:{
    '$route' : 'getDataList'
  },
};
</script>



