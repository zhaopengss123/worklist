<template>
  <div class="weekly-task-box">
    <div class="weekly-head">
      <ul>
        <li>
          <b class="success">{{ completeData.length }}</b>
          <p>完成任务数</p>
        </li>
        <li>
          <b class="danger">{{ outData.length }}</b>
          <p>延期任务数</p>
        </li>
        <li>
          <b class="main">{{ addData.length }}</b>
          <p>新增任务数</p>
        </li>
      </ul>
    </div>
    <div class="weekly-tabs-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我关注的任务</span>
        </div>
        <div>
          <el-table
            :data="noticeData"
            stripe
            max-height="280"
            style="width: 100%">
            <!-- <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('noticeData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="任务名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.mName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.id">{{scope.row.mName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.pName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pid">{{scope.row.pName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
           <!--  <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column> -->
            <el-table-column
              label="接收人"
              prop="receptionName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="发起人"
              prop="userName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '拒绝' : scope.row.status == 3 ? '完成': scope.row.status == 5 ? '已拒绝' : scope.row.status == 5 ? '已关闭' : '待处理'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
              max-width="120">
              <template slot-scope="scope">{{ scope.row.createTime | format }}</template>
            </el-table-column>
            <el-table-column
              label="期望完成"
              prop="expectTime"
              max-width="120">
              <template slot-scope="scope">{{ scope.row.expectTime | format }}</template>
            </el-table-column>
            <el-table-column
              label="实际完成"
              prop="completeTime"
              max-width="120">
              <template slot-scope="scope">{{ scope.row.completeTime | format }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>完成任务</span>
        </div>
        <div>
          <el-table
            :data="completeData"
            stripe
            max-height="280"
            style="width: 100%">
           <!--  <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('completeData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="任务名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.mName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.id">{{scope.row.mName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.pName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pid">{{scope.row.pName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column> -->
            <el-table-column
              label="接收人"
              prop="receptionName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="发起人"
              prop="userName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '拒绝' : scope.row.status == 3 ? '完成' : scope.row.status == 5 ? '已关闭': '待处理'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
              max-width="120">
              <template slot-scope="scope">{{ scope.row.createTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="期望完成"
              prop="expectTime"
              max-width="120">
               <template slot-scope="scope">{{ scope.row.expectTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="实际完成"
              prop="completeTime"
              max-width="120">
               <template slot-scope="scope">{{ scope.row.completeTime | format}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>延期任务</span>
        </div>
        <div>
          <el-table
            :data="outData"
            stripe
            max-height="280"
            style="width: 100%">
           <!--  <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('outData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="任务名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.mName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.id">{{scope.row.mName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.pName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pid">{{scope.row.pName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column> -->
            <el-table-column
              label="接收人"
              prop="receptionName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="发起人"
              prop="userName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '拒绝' : scope.row.status == 3 ? '完成': scope.row.status == 5 ? '已关闭': '待处理'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
              max-width="120">
              <template slot-scope="scope">{{ scope.row.createTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="期望完成"
              prop="expectTime"
              max-width="120">
               <template slot-scope="scope">{{ scope.row.expectTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="实际完成"
              prop="completeTime"
              max-width="120">
               <template slot-scope="scope">{{ scope.row.completeTime | format}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增任务</span>
        </div>
        <div>
          <el-table
            :data="addData"
            stripe
            max-height="280"
            style="width: 100%">
            <!-- <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('addData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="任务名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.mName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.id">{{scope.row.mName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.pName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pid">{{scope.row.pName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <!-- <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column> -->
            <el-table-column
              label="接收人"
              prop="receptionName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="发起人"
              prop="userName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '拒绝' : scope.row.status == 3 ? '完成' : scope.row.status == 5 ? '已关闭': '待处理'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createTime"
              max-width="120">
              <template slot-scope="scope"> {{ scope.row.createTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="期望完成"
              prop="expectTime"
              max-width="120">
               <template slot-scope="scope"> {{ scope.row.expectTime | format}}</template>
            </el-table-column>
            <el-table-column
              label="实际完成"
              prop="completeTime"
              max-width="120">
              <template slot-scope="scope"> {{ scope.row.completeTime | format}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        noticeData: [],
        completeData: [],
        outData: [],
        addData: [],
        date: ''
      }
    },
    methods: {
      request (date) {
        this.date = date
        this.getNotice();
        this.getComplete();
        this.getOut();
        this.getAdd();
      },
      /* ------------------------- 关注/取消关注 ------------------------- */
      async follow (items, idx) {
        let item = this[items][idx];
        if(!item.loading){
          item.loading = true;
          this.$set(this[items], idx, item);
          
          let path = item.favorite ? '/mission/cancelNoticeMission' : '/mission/noticeMission';
          let res = await this.axios.post(path, {id: item.id});
          item.loading = false;
          if(res.data && res.data.code == 1000){
            item.favorite = !item.favorite;
          }else{
            this.$message.error('关注/取消关注失败');
          }
          this.$set(this[items], idx, item);
        }
      },
      /* ------------------------- 获取关注任务 ------------------------- */
      async getNotice () {
        let res = await this.axios.post('/week/noticeMission', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.noticeData = res.data.result.list;
        }
      },
      /* ------------------------- 获取完成任务 ------------------------- */
      async getComplete () {
        let res = await this.axios.post('/week/completeMission', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.completeData = res.data.result.list;
        }
      },
      /* ------------------------- 获取延期任务 ------------------------- */
      async getOut () {
        let res = await this.axios.post('/week/outDateMission', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.outData = res.data.result.list;
        }
      },
      /* ------------------------- 获取新增任务 ------------------------- */
      async getAdd () {
        let res = await this.axios.post('/week/addNewMission', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.addData = res.data.result.list;
        }
      },
    }
  }
</script>