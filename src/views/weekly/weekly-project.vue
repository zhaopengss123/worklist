<template>
  <div class="weekly-project-box">
    <div class="weekly-head">
      <ul>
        <li>
          <b class="success">{{ completeData.length }}</b>
          <p>完成项目数</p>
        </li>
        <li>
          <b class="main">{{ addData.length }}</b>
          <p>新增项目数</p>
        </li>
      </ul>
    </div>
    <div class="weekly-tabs-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我关注的项目</span>
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
              label="项目名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.projectName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pId">{{scope.row.projectName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.parentName" placement="top" v-if="scope.row.ParentId">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.parentId">{{scope.row.parentName}}</router-link>
                </el-tooltip>
                {{scope.row.ParentId ? '' : '-'}}
              </template>
            </el-table-column>
            <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column>
            <el-table-column
              label="负责人"
              prop="receiverName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 2 ? '暂停中' : scope.row.status == 3 ? '已结束': scope.row.status == 5 ? '已关闭' : ' 进行中 '}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.createDate | format}}</template>
            </el-table-column>
            <el-table-column
              label="结束时间"
              prop="completeDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.completeDate | format}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本周完成项目</span>
        </div>
        <div>
          <el-table
            :data="completeData"
            stripe
            max-height="280"
            style="width: 100%">
            <!-- <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('completeData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="项目名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.projectName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pId">{{scope.row.projectName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.parentName" placement="top" v-if="scope.row.ParentId">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.parentId">{{scope.row.parentName}}</router-link>
                </el-tooltip>
                {{scope.row.ParentId ? '' : '-'}}
              </template>
            </el-table-column>
            <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column>
            <el-table-column
              label="负责人"
              prop="receiverName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '暂停中' : scope.row.status == 5 ? '已关闭' : '已结束'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.createDate | format}}</template>
            </el-table-column>
            <el-table-column
              label="结束时间"
              prop="completeDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.completeDate | format}}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本周新增项目</span>
        </div>
        <div>
          <el-table
            :data="addData"
            stripe
            max-height="280"
            style="width: 100%">
           <!--  <el-table-column
              label="关注"
              width="60">
              <template slot-scope="scope">
                <i class="font-size-18" 
                  :class="[scope.row.loading ? 'el-icon-loading' : scope.row.favorite ? 'el-icon-cus-collection-active color-red' : 'el-icon-cus-collection']" 
                  @click="follow('addData', scope.$index)"></i>
              </template>
            </el-table-column> -->
            <el-table-column
              label="项目名称"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.projectName" placement="top">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.pId">{{scope.row.projectName}}</router-link>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="归属项目"
              max-width="280">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.parentName" placement="top" v-if="scope.row.ParentId">
                  <router-link class="color-blue" :to="'/home/projectdetails/' + scope.row.parentId">{{scope.row.parentName}}</router-link>
                </el-tooltip>
                {{scope.row.ParentId ? '' : '-'}}
              </template>
            </el-table-column>
            <el-table-column
              label="重要性"
              max-width="80">
              <template slot-scope="scope">
                {{scope.row.level == 1 ? '低' : scope.row.level == 2 ? '中' : '高'}}
              </template>
            </el-table-column>
            <el-table-column
              label="负责人"
              prop="receiverName"
              max-width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              max-width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status == 1 ? '' : scope.row.status == 2 ? 'warning' : 'success'" size="small">{{scope.row.status == 1 ? '进行中' : scope.row.status == 2 ? '暂停中' : scope.row.status == 5 ? '已关闭' : '已结束'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="createDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.createDate | format}}</template>
            </el-table-column>
            <el-table-column
              label="结束时间"
              prop="completeDate"
              max-width="120">
              <template slot-scope="scope">{{scope.row.completeDate | format}}</template>
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
        addData: [],
        projectInfo: '',
        date: '',
      }
    },
    methods: {
      request (date) {
        this.date = date;
        this.getNotice();
        this.getComplete();
        this.getAdd();
      },
      /* ------------------------- 关注/取消关注 ------------------------- */
      async follow (items, idx) {
        let item = this[items][idx];
        console.log(item.loading);
        if(!item.loading){
          item.loading = true;
          this.$set(this[items], idx, item);
          
          let res = await this.axios.post('/project/addFavorite', {id: item.pId, favorite: item.favorite ? 0 : 1});
          item.loading = false;
          if(res.data && res.data.code == 1000){
            item.favorite = !item.favorite;
          }else{
            this.$message.error('关注/取消关注失败');
          }
          this.$set(this[items], idx, item);
        }
      },
      /* ------------------------- 获取关注项目 ------------------------- */
      async getNotice () {
        let res = await this.axios.post('/week/noticeProject', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.noticeData = res.data.result.list;
        }
      },
      /* ------------------------- 获取完成项目 ------------------------- */
      async getComplete () {
        let res = await this.axios.post('/week/completeProject', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.completeData = res.data.result.list;
        }
      },
      /* ------------------------- 获取新增项目 ------------------------- */
      async getAdd () {
        let res = await this.axios.post('/week/addNewProject', {startDate: this.date[0], endDate: this.date[1], pageNo: 1, pageSize: 999});
        if(res.data && res.data.code == 1000){
          this.addData = res.data.result.list;
        }
      }
    }
  }
</script>
<style lang="less">
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
 .cell{
   overflow:hidden !important;
   white-space:nowrap !important;
   text-overflow:ellipsis !important;
 }
</style>