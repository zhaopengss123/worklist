<template >
  			<div class="content">
        <div class="quote-title">配置工单</div>
				<div class="topradio">
          <p>工单类型配置</p>
						  <el-radio-group v-model="radios" >
						    <el-radio style="padding-top:20px; margin-left:0; margin-right:20px;" v-for="(item,index) in data_list.typeList" :key="index" :label="item.typeCode" @change="select_radio">{{item.typeName}}</el-radio>
						  </el-radio-group>
				</div>
  				  <!--工单类型配置-->
  			<div class="select_list" v-if="select_on">
  					<p>归属职位配置</p>
  					    <el-cascader
                change-on-select
						    :options="data_list.projectList"
						    v-model="selectedOptions"
						    @change="handleChange">
						  </el-cascader>
  				</div>  
  				<!--回执内容配置-->
  				<div class="hz_seting">
  					<p>回执内容配置</p>
  					 <el-select v-model="model_value" placeholder="请选择字段类型">
					    <el-option
					      v-for="item in data_list.fieldTypeList"
					      :key="item.value"
					      :label="item.fieldTypeName"
					      :value="item.fieldTypeName">
					    </el-option>
					  </el-select>
					   <el-button type="primary" @click="addList()">添加</el-button>
  				</div>
  				<div class="table_list">
  					    <el-table
					      :data="tableData" style="width: 100%"> 
					      	<el-table-column prop="type" label="类型" ></el-table-column>
							<el-table-column label="标题" >
								 <template slot-scope="scope">
							        <el-input v-model="tableData[scope.$index].chineseName" placeholder="请输入内容"></el-input>
							      </template>
							</el-table-column>
							<el-table-column label="字段名" >
								 <template slot-scope="scope">
							        <el-input v-model="tableData[scope.$index].fieldName" placeholder="请输入内容"></el-input>
							      </template>
							</el-table-column>
              	<el-table-column label="是否必填" >
								 <template slot-scope="scope">
							        <!-- <el-input v-model="tableData[scope.$index].fieldName" placeholder="请输入内容"></el-input> -->
                    <el-select v-model="tableData[scope.$index].isNull" placeholder="请选择">
                      <el-option    label="必填" value="1"></el-option>
                      <el-option    label="非必填" value="0"> </el-option> 
                      
                    </el-select>
							      </template>
							</el-table-column>
							<el-table-column label="限制" >
								 <template slot-scope="scope">
							        <el-input v-model="tableData[scope.$index].limit" placeholder="请输入内容"></el-input>
							      </template>
							</el-table-column>
							<el-table-column label="数据源" >
								 <template slot-scope="scope">
							        <el-input v-model="tableData[scope.$index].dataSource" placeholder="请输入内容"></el-input>
							      </template>
							</el-table-column>
							<el-table-column  label="操作" >
								  <template slot-scope="scope">
							        <el-button type="danger"  icon="el-icon-delete" @click="removeList(scope.$index)" circle></el-button> 
							      </template>
							</el-table-column>
					    </el-table>
  				</div>
  				<div class="submit">
  					<el-button type="primary" @click="submitx">保存</el-button>
  				</div>
			</div>
</template>
<style  lang="less">
.content{
  .topradio{  margin: 20px 0;}
	p{ margin: 10px 0;}
  .submit{ width: 100%; text-align: center; margin: 20px 0;}
  .table_list{ padding-top: 20px;}
    .quote-title {
    margin-bottom: 20px;
    padding: 12px 15px;
    line-height: 22px;
    border-left: solid 5px #00a2ca;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
  }
}
</style>
<script>
export default {
  data(){
    return {
      				radios:'',
							selectedOptions: [],
					    type_value:'',
              model_value:'',
              tableData: [],
              table_content:'',
              table_name:'',
              table_xz:'',
              table_data:'',
              data_list:[], 
              select_on:false,
              img1 : 0,
              img2 : 0,
              img3 : 0,
              img4 : 0,
              img5 : 0,
              video1:0,
              video2:0,
              video3:0,
              video4:0,
              video5:0,
              file1:0,
              file2:0,
              file3:0,
              file4:0,
              file5:0
    }
  },
  mounted() {
    this.getData();
    },
  methods:{
  getData(){
     this.axios.post('/sheetTemplate/resultList', {
        }).then(res => {
           let projectList =  res.data.result.projectList;
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
           res.data.result.projectList  = projectList;
           this.data_list = res.data.result;
           this.select_on = true;
        }).catch(error => { //捕获失败
            this.prompt('网络连接失败,请稍后再试','warning');
        })
  },
  //添加列表
  addList:function(){
    var that = this;
    if(that.model_value==""){
      that.$message.error('字段类型不能为空');
    }else{
    var jsons = {};
    jsons.type=that.model_value;
    jsons.chineseName='';
    jsons.fieldName='';
    jsons.limit='';
    jsons.dataSource = '';
    jsons.isEmpty = "";
    for(let i =0; i<that.data_list.fieldTypeList.length; i++){
      if(that.model_value==that.data_list.fieldTypeList[i].fieldTypeName){
        jsons.fieldType = that.data_list.fieldTypeList[i].fieldTypeCode;
      }
    }
    
    this.tableData.map(item=>{
      if(item.fieldType==4){
        this.img1 = 1;
      }else if(item.fieldType==9){
        this.img2 = 1;
      }else if(item.fieldType==10){
        this.img3 = 1;
      }else if(item.fieldType==11){
        this.img4 = 1;
      }else if(item.fieldType==12){
        this.img5 = 1;
      }else if(item.fieldType==5){
        this.video1 = 1;
      }else if(item.fieldType==13){
        this.video2 = 1;
      }else if(item.fieldType==14){
        this.video3 = 1;
      }else if(item.fieldType==15){
        this.video4 = 1;
      }else if(item.fieldType==16){
        this.video5 = 1;
      }else if(item.fieldType==6){
        this.file1 = 1;
      }else if(item.fieldType==17){
        this.file2 = 1;
      }else if(item.fieldType==18){
        this.file3 = 1;
      }else if(item.fieldType==19){
        this.file4 = 1;
      }else if(item.fieldType==20){
        this.file5 = 1;
      }
    })
    if(this.model_value =='上传图片1'&&this.img1==1){
         this.$message({ message: '只能存在一个上传图片1',type: 'error'});
         return false;
    }else if(this.model_value =='上传图片2'&&this.img2==1){
          this.$message({ message: '只能存在一个上传图片2',type: 'error'});
         return false;
    }else if(this.model_value =='上传图片3'&&this.img3==1){
          this.$message({ message: '只能存在一个上传图片3',type: 'error'});
         return false;
    }else if(this.model_value =='上传图片4'&&this.img4==1){
          this.$message({ message: '只能存在一个上传图片4',type: 'error'});
         return false;
    }else if(this.model_value =='上传图片5'&&this.img5==1){
          this.$message({ message: '只能存在一个上传图片5',type: 'error'});
         return false;
    }else if(this.model_value =='上传视频1'&&this.video1==1){
          this.$message({ message: '只能存在一个上传视频1',type: 'error'});
         return false;
    }else if(this.model_value =='上传视频2'&&this.video2==1){
          this.$message({ message: '只能存在一个上传视频2',type: 'error'});
         return false;
    }else if(this.model_value =='上传视频3'&&this.video3==1){
          this.$message({ message: '只能存在一个上传视频3',type: 'error'});
         return false;
    }else if(this.model_value =='上传视频4'&&this.video4==1){
          this.$message({ message: '只能存在一个上传视频4',type: 'error'});
         return false;
    }else if(this.model_value =='上传视频5'&&this.video5==1){
          this.$message({ message: '只能存在一个上传视频5',type: 'error'});
         return false;
    }else if(this.model_value =='上传附件1'&&this.file1==1){
          this.$message({ message: '只能存在一个上传附件1',type: 'error'});
         return false;
    }else if(this.model_value =='上传附件2'&&this.file2==1){
          this.$message({ message: '只能存在一个上传附件2',type: 'error'});
         return false;
    }else if(this.model_value =='上传附件3'&&this.file3==1){
          this.$message({ message: '只能存在一个上传附件3',type: 'error'});
         return false;
    }else if(this.model_value =='上传附件4'&&this.file4==1){
          this.$message({ message: '只能存在一个上传附件4',type: 'error'});
         return false;
    }else if(this.model_value =='上传附件5'&&this.file5==1){
          this.$message({ message: '只能存在一个上传附件5',type: 'error'});
         return false;
    }
    }
    that.tableData.push(jsons);
    },

  //删除列表
  removeList:function(index){
    var that = this;
   if(this.tableData[index].fieldType ==4)
    {
        this.img1=0;
    }else if(this.tableData[index].fieldType ==9){
        this.img2=0;
    }else if(this.tableData[index].fieldType ==10){
        this.img3=0;
    }else if(this.tableData[index].fieldType ==11){
         this.img4=0; 
    }else if(this.tableData[index].fieldType ==12){
        this.img5=0;
    }else if(this.tableData[index].fieldType ==5){
        this.video1=0;
    }else if(this.tableData[index].fieldType ==13){
        this.video2=0;
    }else if(this.tableData[index].fieldType ==14){
        this.video3=0;
    }else if(this.tableData[index].fieldType ==15){
        this.video4=0;
    }else if(this.tableData[index].fieldType ==16){
        this.video5=0;
    }else if(this.tableData[index].fieldType ==6){
        this.file1=0;
    }else if(this.tableData[index].fieldType ==17){
        this.file2=0;
    }else if(this.tableData[index].fieldType ==18){
        this.file3=0;
    }else if(this.tableData[index].fieldType ==19){
        this.file4=0;
    }else if(this.tableData[index].fieldType ==20){
        this.file5=0;
    }
    that.tableData.splice(index,1);
  },
  //保存信息
  submitx:function(){
    var that = this;
    (that.radios=="")?that.$message.error('请选择工单类型'):(that.selectedOptions=="")?that.$message.error('请选择归属职位'):(that.tableData.length<1)?that.$message.error('请添加回执内容'):that.submits();
  },
  submits(){ 
      let isNameNull = 0;
      let selectNull = 0;
      for(let i=0; i<this.tableData.length; i++){
        if(this.tableData[i].chineseName==""){
          isNameNull =1; 
        };
        if(this.tableData[i].fieldType==3&&this.tableData[i].dataSource==""){
          selectNull = 1;
        }
      } 
      if(isNameNull==0&&selectNull==0){
          
      }else if(isNameNull==1){
              this.$message({
                      message: '字段标题不能为空',
                      type: 'error'
                    });
                    return false;
      }else if(selectNull==1){
                        this.$message({
                      message: '下拉列表的数据源不能为空',
                      type: 'error'
                    });
                    return false;
      }


      let content = this.tableData;
      let projectId = this.selectedOptions[this.selectedOptions.length-1];
      let projectIdArr = this.selectedOptions;
      let paramJson = {};
      paramJson = JSON.stringify({
      typeCode: this.radios,
      projectId:projectId ,
      content:content,
      projectIdArr:projectIdArr
    })
      this.axios.post('/sheetTemplate/saveAndUpdateTemplate', {
          paramJson:paramJson
        }).then(res => {

          if(res.data.code==1000){
                    this.$message({
                      message: '保存成功',
                      type: 'success'
                    });
                    }else{
                       this.$message({
                      message: '保存失败',
                      type: 'error'
                    });
                    }
        }).catch(error => { //捕获失败
            this.prompt('网络连接失败,请稍后再试','warning');
        })
  },
  select_radio(){
        this.axios.post('/sheetTemplate/templateContent', {
          typeCode: this.radios
        }).then(res => {
          
           let projectList =  res.data.result.projectList;
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
           res.data.result.projectList  = projectList;
           this.data_list = res.data.result;
           if(res.data.result.templateMap.commonArray){
              this.tableData = res.data.result.templateMap.commonArray;
           }else{
             this.tableData =[];
           };
      if(res.data.result.templateMap.projectIdArr){
              
             let select_list = res.data.result.templateMap.projectIdArr;
             select_list=select_list.substring(1);
              select_list=select_list.substring(0,select_list.length-1);
              select_list = select_list.split(",");
              for(let i =0; i<select_list.length; i++){
                select_list[i] = Number(select_list[i]);
              }
             this.selectedOptions = [];
              select_list.map( item => {
                this.selectedOptions.push(item);
              })
              console.log(this.selectedOptions);
      }else{
        this.selectedOptions=[];
      }
          
        }).catch(error => { //捕获失败
            this.prompt('网络连接失败,请稍后再试','warning');
        })  
       
  },
//联动选框
handleChange(value) {
        console.log(this.selectedOptions);
},


}
}
</script>


  

