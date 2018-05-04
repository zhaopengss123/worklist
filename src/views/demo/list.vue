<template>
  <div>
    
    <el-form :inline="true" :model="formInline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" clearable placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间段">
        <el-date-picker
          v-model="formInline.time"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData(1)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button-group>
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>

    <el-table
      :data="tableData"
      border 
      v-loading="loading" 
      @selection-change="handleSelectionChange" 
      max-height="200"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        min-width="120">
      </el-table-column>
      <el-table-column
        label="地址"
        min-width="300">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top">
            <span>{{scope.row.address}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        min-width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="                                                                                                                      scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <app-pagination requestUrl="/mission/missionList" @response="getData" :query="formInline" ref="pagination"></app-pagination>

  </div>
</template>
<script>
  import PaginationComponent from '@/components/pagination'
  export default {
    components: {
      'appPagination': PaginationComponent
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
        formInline: {
          user: '',
          region: '',
          time: '',
        },
        loading: false,
        tableData: []
      }
    },
    methods: {
      handleClick(row) {
        // console.log(row);
      },
      async getData(current) {
        this.loading = true;
        let res = await this.$refs.pagination.request(current);
        this.tableData = res.result.list;
        this.loading = false;
      },
      handleSelectionChange(val) {
        // console.log(val)
      }
    }
  }
</script>

<style lang="less">
.el-button-group{
  float: right;
  margin-bottom: 22px;
}
.cell{
  white-space: nowrap !important;
}
</style>


