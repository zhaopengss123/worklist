<template>
  <div class="weekly-box">
    <div class="weekly-query">
      <!-- <el-date-picker
        v-model="datePicker" 
        @change="datePickerChange" 
        type="daterange"
        align="center"
        unlink-panels 
        :editable="false"
        value-format="yyyy-MM-dd"
        :clearable="false"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker> -->

      <el-date-picker
        v-model="weekVal" 
        @change="datePickerChange" 
        type="week"
        unlink-panels
        format="yyyy 第 WW 周"
        :picker-options="weekDay"
        :default-value="valTime"
        placeholder="选择周">
      </el-date-picker> 

    </div>
    <el-tabs type="border-card" @tab-click="tabsChange">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-cus-box"></i> 我的项目</span>
        <app-weekly-project ref="weeklyProject"></app-weekly-project>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-cus-similarproduct"></i> 我的任务</span>
        <app-weekly-task ref="weeklyTask"></app-weekly-task>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import AppWeeklyProject from './weekly-project';
  import AppWeeklyTask from './weekly-task';
  export default {
    name: 'Weekly',
    components: {
      AppWeeklyProject,
      AppWeeklyTask
    },
    mounted () {
      /* ------------------------------- 默认显示最近七天的数据 ------------------------------- */
       Date.prototype.format = function(fmt) { 
          var o = { 
              "M+" : this.getMonth()+1,                 //月份 
              "d+" : this.getDate(),                    //日 
              "h+" : this.getHours(),                   //小时 
              "m+" : this.getMinutes(),                 //分 
              "s+" : this.getSeconds(),                 //秒 
              "q+" : Math.floor((this.getMonth()+3)/3), //季度 
              "S"  : this.getMilliseconds()             //毫秒 
          }; 
          if(/(y+)/.test(fmt)) {
                  fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
          }
          for(var k in o) {
              if(new RegExp("("+ k +")").test(fmt)){
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
              }
          }
          return fmt; 
      };

      const DATE = new Date();
      const Start = new Date(DATE.getTime() - 3600 * 1000 * 24 * 7);
      const End = DATE;

      let [startYear, endYear] = [Start.getFullYear(), End.getFullYear()];
      let [startMonth, endMonth] = [
            Start.getMonth() + 1 < 10 ? '0' + Start.getMonth() + 1 : Start.getMonth() + 1, 
            End.getMonth() + 1 < 10 ? '0' + End.getMonth() + 1 : End.getMonth() + 1
          ];
      let [startDate, endDate] = [Start.getDate(), End.getDate()];

      const StartFormat = startYear + '-' + startMonth + '-' + startDate;
      const EndFormat = endYear + '-' + endMonth + '-' + endDate; 

      let startDate111 = (new Date(DATE)).getTime() - 3600 * 1000 * 24 * 7;
      let endDate111 =  (new Date(DATE)).getTime() ;
      const StartFormat11 = new Date(startDate111).format("yyyy-MM-dd");
      const EndFormat11 = new Date(endDate111).format("yyyy-MM-dd");

      console.log(StartFormat11, EndFormat11)
  
      this.datePicker = [StartFormat11, EndFormat11];

      this.request();
    },
    data() {
      return {
        datePicker: '',
        weekVal: new Date(),
        tabsActive: 0,
        weekDay:{
          firstDayOfWeek:1
        },
        valTime:'2017-11-27',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        allowRequest: true
      }
    },
    methods: {
      /* -------------------------- 日期改变事件 -------------------------- */
      datePickerChange(val) {
        Date.prototype.format = function(fmt) { 
            var o = { 
                "M+" : this.getMonth()+1,                 //月份 
                "d+" : this.getDate(),                    //日 
                "h+" : this.getHours(),                   //小时 
                "m+" : this.getMinutes(),                 //分 
                "s+" : this.getSeconds(),                 //秒 
                "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                "S"  : this.getMilliseconds()             //毫秒 
            }; 
            if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return fmt; 
        }
        let startDate = (new Date(val)).getTime() - 24*60*60*1000;
        let endDate = startDate + 24*60*60*1000*6;
        const StartFormat = new Date(startDate).format("yyyy-MM-dd");
        const EndFormat = new Date(endDate).format("yyyy-MM-dd");
        this.datePicker = [StartFormat, EndFormat];
        console.log(this.datePicker)
        this.allowRequest = true;
        this.request();
      },
      /* -------------------------- tabs改变事件 -------------------------- */
      tabsChange (val) {
        let index = Number(val.index);
        if(index !== this.tabsActive){
          this.tabsActive = index;
          this.request();
          this.allowRequest = false;
        }
      },
      /* -------------------------- 通知子组件刷新数据 -------------------------- */
      request () {
        if(this.tabsActive === 0){
          if (this.allowRequest) this.$refs.weeklyProject.request(this.datePicker);
        }else{
          if (this.allowRequest) this.$refs.weeklyTask.request(this.datePicker);
        }
      }
    }
  }
</script>

<style lang="less">
@el-tabs-height: 60px;
.weekly-box{
  height: 100%;
  .el-tabs{
    height: 100%;
    position: relative;
  }
  .el-tabs__header{
    width: 100%;
    height: @el-tabs-height;
    line-height: @el-tabs-height;
    position: absolute;
    top: 0;
    z-index: 1;
    .el-tabs__item{
      height: @el-tabs-height;
      line-height: @el-tabs-height;
      i{
        font-size: 16px;
      }
    }
  }
  .el-tabs__content{
    height: 100%;
    padding-top: @el-tabs-height + 15;
    .el-tab-pane{
      height: 100%;
      overflow-y: auto;
    }
  }
  .weekly-query{
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 2;
    .el-range-editor{
      border: none;
    }
  }
  .weekly-head{
    padding: 20px 0;
    text-align: center;
    li{
      width: 240px;
      display: inline-block;
      padding: 20px 0;
      margin: 0 30px;
      text-align: center;
      border: solid 1px #DFE4ED;
      border-radius: 10px;
      b{
        font-size: 40px;
        font-weight: 400;
        &.success{
          color: #67C23A;
        }
        &.danger{
          color: #FA5555;
        }
        &.main{
          color: #409EFF;
        }
      }
      p{
        color: #5A5E66;
        font-size: 14px;
      }
    }
  }
  .el-card{
    margin-top: 30px;
  }
}
</style>
