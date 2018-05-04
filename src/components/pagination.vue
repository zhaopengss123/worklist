<template>
  <div>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" 
      v-show="total"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
/**
   * @module 分页组件
   * @param requestUrl    请求地址<必填>
   * @param response      条件改变时调用的父组件方法
   * @param query         请求参数
   * @author phuhoang
   */
export default {
  name: "Pagination",
  props: ["requestUrl", "query"],
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      allowRequest: true
    };
  },
  methods: {
    /**
       * @function 条数改变事件
       * @param 每页显示条数
       */
    sizeChange(val) {
      this.pageSize = val;
      this.$emit("response", 1);
    },
    /**
       * @function 当前页改变事件
       * @param 当前页
       */
    currentChange(val) {
      if (this.allowRequest) {
        this.pageNo = val;
        this.$emit("response", val);
      }
    },
    /**
       * @function 数据请求
       * @param 请求条件<可选>
       */

    request(pageNo) {
      /* ----------- 请求中页数改变不触发请求 ----------- */
      this.allowRequest = false;
      /* ----------- 设置请求参数及当前页 ----------- */
      this.pageNo = pageNo || 1;
      let params = this.query;
      params.pageNo = this.pageNo;
      params.pageSize = this.pageSize;
      for(let key in params){
        if(params[key] == "" || params[key] == null || params[key] == undefined){
          delete params[key]
        }
      }
      /* ----------- 返回 Promise 对象 ----------- */
      return new Promise((resolve, reject) => {
        this.axios
          .post(this.requestUrl, {
            paramJson: JSON.stringify(params)
          })
          .then(
            res => {
              this.total = res.data.result.total;
              resolve(res.data);
              this.allowRequest = true;
            },
            err => {
              reject(err);
              this.allowRequest = true;
            }
          );
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
