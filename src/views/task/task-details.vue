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
           {{detailData.expectTimeStart | format}} {{detailData.expectTimeStart?'——':''}} {{ detailData.expectTime | format}}  
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
          <el-form-item label="工单操作" v-show="detailData.status == 0 && detailData.personOper == true " >
            <el-button type="success" plain size="small" icon="el-icon-success" @click="apllyAct" v-if="apllyFlag">接受</el-button>
            <el-button type="info" plain size="small" icon="el-icon-error" @click="rejectAct" v-if="rejectFlag">拒绝</el-button>
            <el-button type="warning" plain size="small" icon="el-icon-refresh"  @click="handRound" v-if="handFlag">转给同事</el-button>
            <span  v-if="apllyTxtFlag" class="successTxt">{{ operationEvent.text }}</span>
          </el-form-item>
          <el-form-item label="工单状态" v-show=" detailData.personOper == false ">
            {{ detailData.status == 1 ? '进行中' : detailData.status == 2 ? '拒绝' : detailData.status == 3 ? '完成' : '待处理' }}
          </el-form-item>
           <el-form-item label="工单状态" v-show="detailData.personOper == true &&  detailData.status != 0">
              <span class="successTxt">{{  detailData.status == 1 ? '已接受' : detailData.status == 2 ? '已拒绝' : detailData.status == 3 ? '已完成': '待处理'}}</span>
           </el-form-item>
        </el-col>
        
        <el-col v-if="data_sb.result.typeCode&&detailData.status==3&&data_sb.result.typeCode!='EQUIPMENT_INSTALL'">
              <el-col v-for="(item,indexmm) in data_sb.result.contentJson.tableData" :key="indexmm" >
                                     <!-- <el-form-item v-if="item.fieldType!=4||item.fieldType!=9||item.fieldType!=10||item.fieldType!=11||item.fieldType!=12||item.fieldType!=5||item.fieldType!=13||item.fieldType!=14||item.fieldType!=15||item.fieldType!=16
                     ||item.fieldType!=6||item.fieldType!=17||item.fieldType!=18||item.fieldType!=19||item.fieldType!=20" :label="item.chineseName" style="width:100%;"> -->
                     <el-form-item v-if="item.fieldType==1||item.fieldType==2||item.fieldType==3||item.fieldType==7||item.fieldType==8" :label="item.chineseName" style="width:100%;">
                        <div>
                            {{item.value}}
                        </div>
                    </el-form-item> 
              </el-col> 
              <!-- 图片弹框 -->
           <el-dialog
            title=""
            :visible.sync="imgVisible"
            width="40%">
            <img :src="imgshowsrc" alt="" style="width:100%; height:auto;">
          </el-dialog>   
     <el-col v-for="(item,indexb) in data_sb.result.contentJson.tableData" :key="indexb" >
     
            <!-- 上传图片1 -->
              
              <el-form-item :label="item.chineseName" v-if="item.fieldType==4"  style="width:100%;">
              <div class="addimg" id="fileimg">
                     <span style="width:100px; height:100px; float:left; margin-right:5px;  cursor: pointer" v-for="(items,indexd) in data_sb.result.contentJson.imgListarr" :key="indexd">
                        <img @click="imgshow(items)" style="width:100px; height:100px; float:left;" :src="items">
                    </span> 
              </div>
           </el-form-item>
            <!-- 上传图片2 -->
              <el-form-item :label="item.chineseName" v-if="item.fieldType==9"  style="width:100%;">
                <div class="addimg" id="fileimg">
                     <span style="width:100px; height:100px; float:left; margin-right:5px;  cursor: pointer" v-for="(items,indexd) in data_sb.result.contentJson.imgListarr2" :key="indexd">
                        <img @click="imgshow(items)" style="width:100px; height:100px; float:left;" :src="items">
                    </span> 
              </div>
           </el-form-item>
            <!-- 上传图片3 -->
              <el-form-item :label="item.chineseName" v-if="item.fieldType==10"  style="width:100%;">
                <div class="addimg" id="fileimg">
                     <span style="width:100px; height:100px; float:left; margin-right:5px;  cursor: pointer" v-for="(items,indexd) in data_sb.result.contentJson.imgListarr3" :key="indexd">
                        <img  @click="imgshow(items)"  style="width:100px; height:100px; float:left;" :src="items">
                    </span> 
              </div>
           </el-form-item>
            <!-- 上传图片4 -->
              <el-form-item :label="item.chineseName" v-if="item.fieldType==11"  style="width:100%;">
              <div class="addimg" id="fileimg">
                     <span style="width:100px; height:100px; float:left; margin-right:5px;  cursor: pointer" v-for="(items,indexd) in data_sb.result.contentJson.imgListarr4" :key="indexd">
                        <img  @click="imgshow(items)"  style="width:100px; height:100px; float:left;" :src="items">
                    </span> 
              </div>
           </el-form-item>
            <!-- 上传图片5 -->
              <el-form-item :label="item.chineseName" v-if="item.fieldType==12"  style="width:100%;">
                <div class="addimg" id="fileimg">
                     <span  @click="imgshow(items)"  style="width:100px; height:100px; float:left; margin-right:5px;  cursor: pointer" v-for="(items,indexd) in data_sb.result.contentJson.imgListarr5" :key="indexd">
                        <img style="width:100px; height:100px; float:left;" :src="items">
                    </span> 
              </div>
           </el-form-item>                                            
            <!-- 上传视频 -->
           <el-form-item v-if="item.fieldType==5" :label="item.chineseName" style="width:100%;" > 
                  <span  v-for="(items,indexa) in data_sb.result.contentJson.videoListarr" :key="indexa" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
          </el-form-item>
            <!-- 上传视频2 -->
           <el-form-item v-if="item.fieldType==13" :label="item.chineseName" style="width:100%;" > 
                  <span  v-for="(items,indexb) in data_sb.result.contentJson.videoListarr2" :key="indexb" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
          </el-form-item>          
            <!-- 上传视频3 -->
           <el-form-item v-if="item.fieldType==14" :label="item.chineseName" style="width:100%;" > 
                  <span  v-for="(items,indexc) in data_sb.result.contentJson.videoListarr3" :key="indexc" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
          </el-form-item>
            <!-- 上传视频4 -->
           <el-form-item v-if="item.fieldType==15" :label="item.chineseName" style="width:100%;" > 
                  <span  v-for="(items,indexd) in data_sb.result.contentJson.videoListarr4" :key="indexd" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
          </el-form-item>
            <!-- 上传视频5 -->
           <el-form-item v-if="item.fieldType==16" :label="item.chineseName" style="width:100%;" > 
                  <span  v-for="(items,indexe) in data_sb.result.contentJson.videoListarr5" :key="indexe" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
          </el-form-item>
            <!-- 上传视频 -->
       
            <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==6" :label="item.chineseName" style="width:100%;" > 
                   <span  v-for="(items,indexf) in data_sb.result.contentJson.fileListarr" :key="indexf" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
            </el-form-item>     
      <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==17" :label="item.chineseName" style="width:100%;" > 
                   <span  v-for="(items,indexg) in data_sb.result.contentJson.fileListarr2" :key="indexg" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
            </el-form-item>                  
      <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==18" :label="item.chineseName" style="width:100%;" > 
                   <span  v-for="(items,indexh) in data_sb.result.contentJson.fileListarr3" :key="indexh" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
            </el-form-item>
      <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==19" :label="item.chineseName" style="width:100%;" > 
                   <span  v-for="(items,indexi) in data_sb.result.contentJson.fileListarr4" :key="indexi" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
            </el-form-item>
      <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==20" :label="item.chineseName" style="width:100%;" > 
                   <span  v-for="(items,indexj) in data_sb.result.contentJson.fileListarr5" :key="indexj" style="color:blue; display:block;" >
                      <a :href="items" target="_blank">{{items}}</a>
                  </span>
            </el-form-item>                        
        </el-col> 


               <!-- 设备详情 -->
             
               <el-col v-if="data_sb.result.typeCode =='DESIGN'" style="width:100%;color:#99a9bf; font-size:16px;">
                  <span style="width:100%; text-align:center; display:block; padding:10px 0;">设备详情</span>
              

        <el-col style="width:100%; margin-bottom:22px;">
               <el-table
                :data="data_sb.result.contentJson.data_Detail"
                style="width: 100%">
                <el-table-column prop="type" label="设备名称"></el-table-column>
                <el-table-column prop="inside_color" label="内色"></el-table-column>
                <el-table-column prop="outside_color" label="外色"></el-table-column>
                <el-table-column prop="model" label="设备类型"></el-table-column>
                <el-table-column prop="moneys" label="单价"></el-table-column>
                <el-table-column prop="numbers" label="数量"></el-table-column>
                <el-table-column prop="price" label="总价"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>   
             
    </el-table>
        </el-col>
 </el-col>





              <!-- //examine -->
             <el-col>
             <el-form-item label="验收清单" class="billList" style="width:100%;" v-if="data_sb.result.typeCode == 'WATER_ELECTRICITY'"  >
              <div class="listys" >
                  <div class="header_list">
                      <ul>
                        <li>区域</li>
                        <li>项目</li>
                        <li>标准水路</li>
                        <li>空气能供热</li>
                        <li>验收结果</li>
                      </ul>
                  </div>
                  <div class="left_list">
                    <ul>
                      <!-- <li v-for="(item,Indexs) in data_sb.result.templateMap.customTemplateArray" :key="Indexs" v-bind:style="{height:42*item.list.length+20+'px',lineHeight:42*item.list.length+20+'px'}">{{item.list[0].deviceName}}</li> -->
                       <li v-for="(item,Indexs) in data_sb.result.contentJson.examine" :key="Indexs" v-bind:style="{height:42*item.list.length+20+'px',lineHeight:42*item.list.length+20+'px'}">{{item.deviceName}}</li> 
                    </ul>
                  </div>
                  <div class="main_list">
                   <div style="width:100%; "  v-for="(item,Indexs) in data_sb.result.contentJson.examine" :key="Indexs">
                     <ul v-for="(items,Indexy) in data_sb.result.contentJson.examine[Indexs].list" :key="Indexy">
                      <li>{{items.projectName}}</li>
                      <li>{{items.waterWay||items.commonNorm}}</li>
                      <li>{{items.airEnergy}}</li>
                      <li>  
              
                      <span>{{items.model==2?'不通过':'通过'}}</span>
                      <el-input v-if="items.text" v-model="items.text" v-show="items.model==2"  :disabled="true" placeholder="不通过原因" style="width:150px; margin-left:10px; margin-bottom:0;"></el-input>
                      </li>
                    </ul>
                    </div> 
                  </div>                  
              </div>
           </el-form-item>  
          </el-col>

      



        </el-col>
      <el-col v-if="data_sb.result.typeCode&&detailData.status==1&&data_sb.result.typeCode!='EQUIPMENT_INSTALL'"> 
  
          <el-col v-for="(item,indexmm) in data_sb.result.templateMap.commonArray" :key="indexmm" >
           
            <!-- 单行文本框 -->
            <el-form-item :label="item.chineseName" v-if="item.fieldType==1" style="width:100%;">
              <div >
              <el-input :maxlength="item.limit?item.limit:10000" v-model="item['value']"  placeholder="请输入内容"></el-input>
              </div>
           </el-form-item>  
            <!-- 多行文本框 -->
             <el-form-item :label="item.chineseName" v-if="item.fieldType==2" style="width:100%;">
              <div >
              <el-input :maxlength="item.limit?item.limit:10000" v-model="item['value']" style="width:300px;" type="textarea" :rows="6" ></el-input>
              </div>
           </el-form-item> 
            <!-- 下拉列表 -->
               <el-form-item :label="item.chineseName" v-if="item.fieldType==3" style="width:100%;">
              <div >
                     <el-select v-model="item['value']" placeholder="请选择">
                      <el-option
                        v-for="(items,index_item) in item.selectContent"
                        :key="index_item"
                        :label="items.name"
                        :value="items.value">
                      </el-option>
                    </el-select>
              </div>
           </el-form-item>
            <!-- 上传图片1 -->
              <el-form-item class="aaaaa" :label="item.chineseName" v-if="item.fieldType==4"  style="width:100%;">
              <div class="addimg" id="fileimg">
                  <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="imgRemove"
                  :auto-upload='false'
                  :on-change="upLoadProimg"
                  :name="'filesname'"
                  :file-list="fileListimg"
                  :limit="Number(item.limit?item.limit:10)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" class="imglist">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG, 且不超过5M ,最多可上传{{item.limit?item.limit:10}}个文件</div>
              </div>
           </el-form-item>
            <!-- 上传图片2 -->
              <el-form-item class="aaaaa" :label="item.chineseName" v-if="item.fieldType==9"  style="width:100%;">
              <div class="addimg" id="fileimg">
                  <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="imgRemove2"
                  :auto-upload='false'
                  :on-change="upLoadProimg2"
                  :name="'filesname'"
                  :file-list="fileListimg2"
                  :limit="Number(item.limit?item.limit:10)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" class="imglist">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG, 且不超过5M ,最多可上传{{item.limit?item.limit:10}}个文件</div>
              </div>
           </el-form-item>
            <!-- 上传图片3 -->
              <el-form-item class="aaaaa" :label="item.chineseName" v-if="item.fieldType==10"  style="width:100%;">
              <div class="addimg" id="fileimg">
                  <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="imgRemove3"
                  :auto-upload='false'
                  :on-change="upLoadProimg3"
                  :name="'filesname'"
                  :file-list="fileListimg3"
                  :limit="Number(item.limit?item.limit:10)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" class="imglist">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG, 且不超过5M ,最多可上传{{item.limit?item.limit:10}}个文件</div>
              </div>
           </el-form-item>
            <!-- 上传图片4 -->
              <el-form-item class="aaaaa" :label="item.chineseName" v-if="item.fieldType==11"  style="width:100%;">
              <div class="addimg" id="fileimg">
                  <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="imgRemove4"
                  :auto-upload='false'
                  :on-change="upLoadProimg4"
                  :name="'filesname'"
                  :file-list="fileListimg4"
                  :limit="Number(item.limit?item.limit:10)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" class="imglist">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG, 且不超过5M ,最多可上传{{item.limit?item.limit:10}}个文件</div>
              </div>
           </el-form-item>
            <!-- 上传图片5 -->
              <el-form-item class="aaaaa" :label="item.chineseName" v-if="item.fieldType==12"  style="width:100%;">
              <div class="addimg" id="fileimg">
                  <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="imgRemove5"
                  :auto-upload='false'
                  :on-change="upLoadProimg5"
                  :name="'filesname'"
                  :file-list="fileListimg5"
                  :limit="Number(item.limit?item.limit:10)">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" class="imglist">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG, 且不超过5M ,最多可上传{{item.limit?item.limit:10}}个文件</div>
              </div>
           </el-form-item>                                            
            <!-- 上传视频 -->
           <el-form-item v-if="item.fieldType==5" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="videoRemove"
              :on-change="upLoadProvideo"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListvideo"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传MP4、AVI、WMV文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>
           <!-- 上传视频2 -->
           <el-form-item v-if="item.fieldType==13" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="videoRemove2"
              :on-change="upLoadProvideo2"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListvideo2"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传MP4、AVI、WMV文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>
           <!-- 上传视频3 -->
           <el-form-item v-if="item.fieldType==14" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="videoRemove3"
              :on-change="upLoadProvideo3"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListvideo3"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传MP4、AVI、WMV文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>          
           <!-- 上传视频4 -->
           <el-form-item v-if="item.fieldType==15" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="videoRemove4"
              :on-change="upLoadProvideo4"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListvideo4"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传MP4、AVI、WMV文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>
           <!-- 上传视频5 -->
           <el-form-item v-if="item.fieldType==16" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="videoRemove5"
              :on-change="upLoadProvideo5"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListvideo5"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传MP4、AVI、WMV文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>

            <!-- 上传附件 -->
            <el-form-item v-if="item.fieldType==6" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="fileRemove"
              :on-change="upLoadProfile"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListfile"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>     
        <!-- 上传附件2 -->
            <el-form-item v-if="item.fieldType==17" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="fileRemove2"
              :on-change="upLoadProfile2"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListfile2"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>  
        <!-- 上传附件 3-->
            <el-form-item v-if="item.fieldType==18" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="fileRemove3"
              :on-change="upLoadProfile3"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListfile3"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>            
        <!-- 上传附件4 -->
            <el-form-item v-if="item.fieldType==19" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="fileRemove4"
              :on-change="upLoadProfile4"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListfile4"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>  
        <!-- 上传附件 5-->
            <el-form-item v-if="item.fieldType==20" :label="item.chineseName" style="width:100%;" > 
            <el-upload 
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="fileRemove5"
              :on-change="upLoadProfile5"
              :multiple="false"
              :limit="Number(item.limit?item.limit:10)"
              :file-list="fileListfile5"
              :auto-upload='false'
              :on-exceed="handleExceed">
              <el-button size="small" type="primary" >上传</el-button>
              <div slot="tip" class="el-upload__tip">仅支持上传JPG、PNG、PDF、Word、Excel、PPT、RAR文件，且不超过20M, 最多可上传{{Number(item.limit?item.limit:10)}}个文件</div>
            </el-upload>
          </el-form-item>  
            <!-- 日期控件 -->
            <el-form-item :label="item.chineseName" v-if="item.fieldType==7" style="width:100%;">
              <div >
                  <el-date-picker
                  type="date"
                  v-model="item['value']"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                  </el-date-picker>
              </div>
           </el-form-item>
           <!-- 上传接口 -->
            <el-form-item :label="item.chineseName" v-if="item.fieldType==8" style="width:100%;">
              <div >
                  <el-input :maxlength="item.limit?item.limit:10000" v-model="item['value']"  placeholder="请输入内容"></el-input>
              </div>
           </el-form-item>
        </el-col> 
            <el-col  v-if="data_sb.result.typeCode =='DESIGN'">
                <el-col>
            <el-form-item label="选择设备" style="margin-bottom:0;" ></el-form-item>       
            <el-form-item style="display:block;  padding-left:30px;">
                    <el-select v-model="Equipmenttype_value" @change="selectsb" placeholder="请选择设备">
                    <el-option
                      v-for="(item,index) in data_sb.result.templateMap.customTemplateArray"
                      :key="index"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- 颜色 -->
                   <el-input v-model="inside_color" placeholder="请输入内色"></el-input>
                   <el-input v-model="outside_color" placeholder="请输入外色"></el-input>
                   <!--设备型号 -->
                   <span  v-for="(item,index) in data_sb.result.templateMap.customTemplateArray" :key='index'>
                    <span v-if="item.value==Equipmenttype_value">
                    <el-select v-model="Equipmentmodel_value"  placeholder="请选择设备型号"  @change="selectmodel" v-if="item.childrenList.length>0" >
                    <el-option
                      v-for="(items,index) in item.childrenList"
                      :key="index"
                      :label="items.name"
                      :value="items.value">
                    </el-option>
                  </el-select>
                  <el-input  v-model="Equipmentmodel_value" placeholder="请输入设备型号" v-if="item.childrenList.length<1"></el-input>
                  </span>
                  </span>
                  <!--选择数量-->
                   <span class="numbers">数量：<el-input-number :min="1" v-model="numbers"></el-input-number></span>
                   <el-input v-model="moneys" placeholder="请输入价格（单价）"></el-input>
                  <el-input  type="text"  placeholder="请输入备注" v-model="remarks"></el-input> 
                  <el-button type="primary" @click="addList">添加</el-button>
           </el-form-item>  
        </el-col> 
        <el-col style="width:100%; margin-bottom:22px;">
               <el-table
                :data="data_Detail"
                style="width: 100%">
                <el-table-column prop="type" label="设备名称"></el-table-column>
                <el-table-column prop="inside_color" label="内色"></el-table-column>
                <el-table-column prop="outside_color" label="外色"></el-table-column>
                <el-table-column prop="model" label="设备型号"></el-table-column>
                <el-table-column prop="moneys" label="单价"></el-table-column>
                <el-table-column prop="numbers" label="数量"></el-table-column>
                <el-table-column prop="price" label="总价"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>   
                <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeList(scope.$index)" type="text" style="color:red" size="small">删除</el-button>
                </template>
              </el-table-column>              
    </el-table>
        </el-col>
      </el-col>

          <el-col>
             <el-form-item label="验收清单" class="billList" style="width:100%;" v-if="data_sb.result.typeCode == 'WATER_ELECTRICITY'"  >
              <div class="listys" >
                  <div class="header_list">
                      <ul>
                        <li>区域</li>
                        <li>项目</li>
                        <li>标准水路</li>
                        <li>空气能供热</li>
                        <li>验收结果</li>
                      </ul>
                  </div>
                  <div class="left_list">                     
                    <ul>
                      <!-- <li v-for="(item,Indexs) in data_sb.result.templateMap.customTemplateArray" :key="Indexs" v-bind:style="{height:42*item.list.length+20+'px',lineHeight:42*item.list.length+20+'px'}">{{item.list[0].deviceName}}</li> -->
                       <li v-for="(item,Indexs) in data_sb.result.templateMap.customTempleArray" :key="Indexs" v-bind:style="{height:42*item.list.length+20+'px',lineHeight:42*item.list.length+20+'px'}">{{item.deviceName}}</li> 
                    </ul>
                  </div>
                  <div class="main_list">
                   <div style="width:100%; "  v-for="(item,Indexs) in data_sb.result.templateMap.customTempleArray" :key="Indexs">
                     <ul v-for="(items,Indexy) in data_sb.result.templateMap.customTempleArray[Indexs].list" :key="Indexy">
                      <li>{{items.projectName}}</li>
                      <li>{{items.waterWay||items.commonNorm}}</li>
                      <li>{{items.airEnergy}}</li>
                      <li>  
                      <el-radio v-model="items.model" :label="1">通过</el-radio>
                      <el-radio v-model="items.model" :label="2" style="margin-left:10px">不通过</el-radio>
                      <el-input v-model="items.text" v-show="items.model==2" placeholder="不通过原因" style="width:150px; margin-left:10px; margin-bottom:0;"></el-input>
                   
                      </li>
                    </ul>
                    </div> 
                  </div>                  
              </div>
           </el-form-item>  
          </el-col>
             <el-dialog
            title=""
            :visible.sync="customLists"
            width="40%">
              <textarea id="textselect" onclick="this.focus();this.select()" style="width:100%; height:500px;outline: none; border:none;" v-model="selectsdList"></textarea>
          </el-dialog>   


            <div style="text-align: center;" ><el-button type="primary" plain @click="submitistypecode" >完成工单</el-button><el-button type="primary" v-if="data_sb.result.typeCode == 'WATER_ELECTRICITY'"  @click="copylist" >复制未通过项目</el-button></div>
          </el-col>
      </el-row>
                      
      <el-row v-if="!data_sb.result.typeCode||data_sb.result.typeCode=='EQUIPMENT_INSTALL'">
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
      
          <el-form-item label="完成描述" v-show="detailData.status != 2&&detailData.status ">
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

        <!--上传文件  -->
        <!-- <el-col :span="24">
           <el-form-item label="文件记录" 
           v-show="detailData.personOper == true && detailData.status == 1">         -->
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
  
        <el-col :span="24" v-show="detailData.personOper == true && detailData.status != 3 && detailData.status != 2"> 
          <div style="text-align: center;" v-if="!data_sb.result.typeCode||data_sb.result.typeCode=='EQUIPMENT_INSTALL'"><el-button type="primary" plain @click="confirmUpload">完成工单</el-button></div>

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
        <!--相关工单-->
    <el-card class="box-card box-card-bot">
      <div slot="header" class="clearfix">
        <span>其他相关工单</span>
      </div>
      <ul class="gongdantype">
        <li><span>工单类型</span><span>工单名称</span><span>状态</span></li>
        <li v-for="(item, index) in data_sb.result.shopSheetList" :key="index">
            <span>{{item.typeName}}</span>
            <span @click="skips(item.id)">{{item.mName}}</span>
            <span>{{item.missionStatus==0?'待处理':(item.missionStatus==1?'进行中':(item.missionStatus==2?'已拒绝':(item.missionStatus==3?'已完成':"")))}}</span>
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
  .gongdantype li span{
    width:200px; float:left; 
    height:40px;
    line-height:40px;
    
  }
  .gongdantype li{
    display:block;
    color:#99a9bf;
    font-size:15px;
    width:100%;
    height: 40px;
    line-height: 40px;
  }
  .gongdantype li span:nth-child(2){

    width:350px;
    color:blue;
    cursor:pointer;
  }
.gongdantype li:nth-child(1) span:nth-child(2){
    color:#99a9bf;
  }
  .listys{
    border: solid 1px #dcdfe6;
    padding: 10px;
    border-radius: 4px;
    color:#909399;
    overflow:hidden;
  }
   .billList .el-form-item__content{
    width: 100%;
  }
  .header_list,.header_list ul{
    width: 100%;
    display: block;
    overflow: hidden;
  }
  .header_list ul li{
    float: left;
    width: 15%;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .header_list ul li:first-child, .header_list ul li:nth-child(2){
    width: 8%;
  }
  .header_list ul li:nth-child(3),.header_list ul li:nth-child(4){
    width: 22%;
  }
  .header_list ul li:last-child{
    width: 40%;
  }
  .left_list{
    float: left;
    width: 8%;
  }
  .main_list{
    width: 92%;
    float: left;
  }
  .main_list ul{
    width: 100%;
    padding-bottom: 2px;
    display: block;
    overflow: hidden;
  }
  .main_list ul li:nth-child(1){
    width: 8.6%;
  }
  .main_list ul li:nth-child(2),.main_list ul li:nth-child(3){
    width: 23.9%;
  }  

  .main_list ul li{
    float: left;
    width: 16.3%;
    min-height: 40px;
    height: 40px;
     overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 40px;
  }
  .main_list ul li:last-child{
    width:41.8%;
  }
.main_list>div{
  padding-bottom: 20px;
}

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
  .addimg{
    margin-top: 15px;
    display: inline-block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width:78px;
    height: 78px;
    display: block;
  }
  .el-input{
    width: auto;
    margin-bottom: 20px;
  }
  .numbers{
    display: inline-block;
    margin-left: 15px;
  }
/*
.el-upload,.el-upload-list__item-actions{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list li{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  */
  .addimg .el-upload,.addimg .el-upload-list__item-actions,.addimg .el-upload-list li{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
.bztextarea{

  width: 50%;
}
  .submit_list{
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
   
  }
  .listys{ width: 100%;}
 

}
</style>

<script>
export default {
  // components: {
  //   comDialog
  // },
  data() {
    return {
      data_sb:{
        "result": {
          "templateMap":{
                 commonArray:[]
          }
         
        }
      },
   
      radio:{
      },
      selectsdList:'',
      customLists:false,
      radioInput:{},
      input:'',       
      flagText:false,
      missionCompleteDescribe:'',
      fileUrl:'',
      input1:'',
      pageSize:null,
      pageNo:null,
      flag:false,
      textareaRemark:'',
      dialogImageUrl: '',
      dialogVisible: false,
      videolist:[],
        Equipmenttype_value:"",
        Equipmentmodel_value:"",
        outside_color:'',
        inside_color:'',
        numbers:1,
        value:'',
        moneys:'',
        tableData:[],
        remarks:'',
        a:{
          b:1
        },
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
      uploadFileUrl:[],
      data_Detail:[],
      fileListimg:[],
      fileListimg2:[],
      fileListimg3:[],
      fileListimg4:[],
      fileListimg5:[],
      fileListvideo:[],
      fileListvideo2:[],
      fileListvideo3:[],
      fileListvideo4:[],
      fileListvideo5:[],
      fileListfile:[],
      fileListfile2:[],
      fileListfile3:[],
      fileListfile4:[],
      fileListfile5:[],
      fileList:{
        list:{
        }
      },
      imgListarr:[],
      imgListarr2:[],
      imgListarr3:[],
      imgListarr4:[],
      imgListarr5:[],
      videoListarr:[],
      videoListarr2:[],
      videoListarr3:[],
      videoListarr4:[],
      videoListarr5:[],
      fileListarr:[],
      fileListarr2:[],
      fileListarr3:[],
      fileListarr4:[],
      fileListarr5:[],
      content:{},
      imgVisible:false,
      imgshowsrc:'',
    };
  },
  methods: {
    copylist(){
        this.customLists = true;
        this.selectsdList = '';
        let data = "";
        this.data_sb.result.templateMap.customTempleArray.map(item=>{
          item.list.map(items=>{
            if(items.model==2){
              if(!items.text){
                  items.text = "空";
              }
            data = data+"(区域:"+item.deviceName+',空气能供热标准:'+items.airEnergy+" ,项目名称:"+items.projectName+' ,水路标准:'+items.waterWay+' ,拒绝理由:'+items.text+')';
            }
          })
        });
        this.selectsdList = data;
        console.log(this.selectsdList);
        setTimeout(function(){
          document.getElementById("textselect").focus();
        document.getElementById("textselect").select();
        },500)

       
    },
    skips(id){
        this.$router.push({ path: "/home/taskdetais/"+id});
    },
    // 回显预览图片
    imgshow(src){
      this.imgVisible = true;
      this.imgshowsrc = src;
    },
    selectsb(){
        this.Equipmentmodel_value="";
        this.moneys = '';
    },
    selectmodel(){
          this.data_sb.result.templateMap.customTemplateArray.map(item =>{
            if(this.Equipmenttype_value == item.value){
              item.childrenList.map(items=>{
                  if(this.Equipmentmodel_value == items.value){
                        this.moneys = items.price;
                    
                  }              
              })
            }
          })
    },
   //添加列表
   addList(){
     let that = this;
     let jsons = {};
    for(var i=0; i<that.data_sb.result.templateMap.customTemplateArray.length; i++){
      if(that.Equipmenttype_value==that.data_sb.result.templateMap.customTemplateArray[i].value){
           jsons.type = that.data_sb.result.templateMap.customTemplateArray[i].name;
      }
      for(var x = 0; x<that.data_sb.result.templateMap.customTemplateArray[i].childrenList.length; x++){
        if(that.Equipmentmodel_value==that.data_sb.result.templateMap.customTemplateArray[i].childrenList[x].value)
         jsons.model = that.data_sb.result.templateMap.customTemplateArray[i].childrenList[x].name;
      }
    }
     jsons.inside_color = that.inside_color;
     jsons.outside_color = that.outside_color;
    
     jsons.numbers = that.numbers;
     jsons.moneys = that.moneys;
     jsons.remarks = that.remarks;
     jsons.price = that.moneys*that.numbers;
     jsons.remove = "<p>删除</p>"
     that.data_Detail.push(jsons);
     console.log(that.data_Detail);
    },
    removeList(index){
    let that = this;
    that.data_Detail.splice(index,1);
    },
        //原始删除文件列表
    handleRemove(file, fileList) {
      this.fileArrList = fileList;
      this.fileArr.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileArr.splice(index,1); 
        }
      })
    },
      //原始上传文件
    upLoadPro(file,fileList){
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf' || this.fileName == 'doc'|| this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){        this.flag = true;
        this.fileArrList = fileList;
        this.upLoadKey1(file.uid, file.name);
      }else{
        this.flag = false;
        this.fileArrList =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileArrList)
    },
    //原始上传阿里云
    upLoadFile1(fileId, fileListName){ 
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
    //获取阿里云key
    upLoadKey1(fileId, fileName){
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
        this.upLoadFile1(fileId, fileName);
      }).catch(error => { //捕获失败
          this.prompt('网络连接失败,请稍后再试','warning');
      })
    },

    //查看图片
    imgFn(url){
      console.log(url)
    },
    //删除图片列表
    imgRemove(file,fileList){
     this.fileListimg = fileList;
     this.imgListarr.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.imgListarr.splice(index,1); 
        }
      })
    },
        //删除图片列表2
    imgRemove2(file,fileList){
     this.fileListimg2 = fileList;
     this.imgListarr2.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.imgListarr2.splice(index,1); 
        }
      })
    },
        //删除图片列表3
    imgRemove3(file,fileList){
     this.fileListimg3 = fileList;
     this.imgListarr3.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.imgListarr3.splice(index,1); 
        }
      })
    },
        //删除图片列表4
    imgRemove4(file,fileList){
     this.fileListimg4 = fileList;
     this.imgListarr4.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.imgListarr4.splice(index,1); 
        }
      })
    },
        //删除图片列表5
    imgRemove5(file,fileList){
     this.fileListimg5 = fileList;
     this.imgListarr5.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.imgListarr5.splice(index,1); 
        }
      })
    },
    //删除视频列表
    videoRemove(file,fileList){
     this.fileListvideo = fileList;
     this.videoListarr.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.videoListarr.splice(index,1); 
        }
      })
    },
    //删除视频列表2
    videoRemove2(file,fileList){
     this.fileListvideo2 = fileList;
     this.videoListarr2.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.videoListarr2.splice(index,1); 
        }
      })
    },
    //删除视频列表3
    videoRemove3(file,fileList){
     this.fileListvideo3 = fileList;
     this.videoListarr3.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.videoListarr3.splice(index,1); 
        }
      })
    },
    //删除视频列表4
    videoRemove4(file,fileList){
     this.fileListvideo4 = fileList;
     this.videoListarr4.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.videoListarr4.splice(index,1); 
        }
      })
    },
    //删除视频列表5
    videoRemove5(file,fileList){
     this.fileListvideo5 = fileList;
     this.videoListarr5.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.videoListarr5.splice(index,1); 
        }
      })
    },    

        //删除文件列表
    fileRemove(file,fileList){
     this.fileListfile = fileList;
     this.fileListarr.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileListarr.splice(index,1); 
        }
      })
    },
        //删除文件列表2
    fileRemove2(file,fileList){
     this.fileListfile2 = fileList;
     this.fileListarr2.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileListarr2.splice(index,1); 
        }
      })
    },
        //删除文件列表3
    fileRemove3(file,fileList){
     this.fileListfile3 = fileList;
     this.fileListarr3.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileListarr3.splice(index,1); 
        }
      })
    },
        //删除文件列表4
    fileRemove4(file,fileList){
     this.fileListfile4 = fileList;
     this.fileListarr4.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileListarr4.splice(index,1); 
        }
      })
    },            
        //删除文件列表5
    fileRemove5(file,fileList){
     this.fileListfile5 = fileList;
     this.fileListarr5.map((item, index) => {
        let fileNAme = item.substring(item.lastIndexOf('\/')+1);
        if(fileNAme == file.name){
           this.fileListarr5.splice(index,1); 
        }
      })
    },  
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`文件数量超出限制`);
    },
    //上传图片
    upLoadProimg(file,fileList){
      let isLt2M = file.size / 1024 / 1024 < 5;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png'){
        if(isLt2M){
        this.flag = true;
        this.fileListimg = fileList;
        this.upLoadKey(file.uid, file.name,'img');
        }else{
        this.flag = false;
        this.fileListimg =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);
        }
      }else{
        this.flag = false;
        this.fileListimg =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListimg)
    },
    //上传图片2
    upLoadProimg2(file,fileList){
      let isLt2M = file.size / 1024 / 1024 < 5;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png'){
        if(isLt2M){
        this.flag = true;
        this.fileListimg2 = fileList;
        this.upLoadKey(file.uid, file.name,'img2');
        }else{
        this.flag = false;
        this.fileListimg2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);
        }
      }else{
        this.flag = false;
        this.fileListimg2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListimg2)
    },
    //上传图片3
    upLoadProimg3(file,fileList){
      let isLt2M = file.size / 1024 / 1024 < 5;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png'){
        if(isLt2M){
        this.flag = true;
        this.fileListimg3 = fileList;
        this.upLoadKey(file.uid, file.name,'img3');
        }else{
        this.flag = false;
        this.fileListimg3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);
        }
      }else{
        this.flag = false;
        this.fileListimg3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListimg3)
    }, 
    //上传图片4
    upLoadProimg4(file,fileList){
      let isLt2M = file.size / 1024 / 1024 < 5;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png'){
        if(isLt2M){
        this.flag = true;
        this.fileListimg4 = fileList;
        this.upLoadKey(file.uid, file.name,'img4');
        }else{
        this.flag = false;
        this.fileListimg4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);
        }
      }else{
        this.flag = false;
        this.fileListimg4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListimg4)
    }, 
    //上传图片5
    upLoadProimg5(file,fileList){
      let isLt2M = file.size / 1024 / 1024 < 5;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png'){
        if(isLt2M){
        this.flag = true;
        this.fileListimg5 = fileList;
        this.upLoadKey(file.uid, file.name,'img5');
        }else{
        this.flag = false;
        this.fileListimg5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);
        }
      }else{
        this.flag = false;
        this.fileListimg5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListimg5)
    },            

    //上传视频
    upLoadProvideo(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='mp4' || this.fileName == 'avi' || this.fileName == 'wmv' || this.fileName == 'mpeg'){
        if(isLt20M){
        this.flag = true;
        this.fileListvideo = fileList;
        this.upLoadKey(file.uid, file.name,'video');
        }else{
        this.flag = false;
        this.fileListvideo =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);          
        }
      }else{
        this.flag = false;
        this.fileListvideo =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListvideo1)
    },
    //上传视频2
    upLoadProvideo2(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='mp4' || this.fileName == 'avi' || this.fileName == 'wmv' || this.fileName == 'mpeg'){
        if(isLt20M){
        this.flag = true;
        this.fileListvideo2 = fileList;
        this.upLoadKey(file.uid, file.name,'video2');
        }else{
        this.flag = false;
        this.fileListvideo2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);          
        }
      }else{
        this.flag = false;
        this.fileListvideo2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListvideo2)
    },
    //上传视频3
    upLoadProvideo3(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='mp4' || this.fileName == 'avi' || this.fileName == 'wmv' || this.fileName == 'mpeg'){
        if(isLt20M){
        this.flag = true;
        this.fileListvideo3 = fileList;
        this.upLoadKey(file.uid, file.name,'video3');
        }else{
        this.flag = false;
        this.fileListvideo3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);          
        }
      }else{
        this.flag = false;
        this.fileListvideo3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListvideo3)
    },
    //上传视频4
    upLoadProvideo4(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='mp4' || this.fileName == 'avi' || this.fileName == 'wmv' || this.fileName == 'mpeg'){
        if(isLt20M){
        this.flag = true;
        this.fileListvideo4 = fileList;
        this.upLoadKey(file.uid, file.name,'video4');
        }else{
        this.flag = false;
        this.fileListvideo4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);          
        }
      }else{
        this.flag = false;
        this.fileListvideo4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListvideo4)
    },
    //上传视频5
    upLoadProvideo5(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='mp4' || this.fileName == 'avi' || this.fileName == 'wmv' || this.fileName == 'mpeg'){
        if(isLt20M){
        this.flag = true;
        this.fileListvideo5 = fileList;
        this.upLoadKey(file.uid, file.name,'video5');
        }else{
        this.flag = false;
        this.fileListvideo5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`);          
        }
      }else{
        this.flag = false;
        this.fileListvideo5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListvideo5)
    },            

    //上传文件
    upLoadProfile(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf'|| this.fileName == 'doc' || this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){
        if(isLt20M){
        this.flag = true;
        this.fileListfile = fileList;
        this.upLoadKey(file.uid, file.name,'file');
        }else{
        this.flag = false;
        this.fileListfile =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`); 
        }
      }else{
        this.flag = false;
        this.fileListfile =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListfile);
    }, 
    //上传文件2
    upLoadProfile2(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf'|| this.fileName == 'doc' || this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){
        if(isLt20M){
        this.flag = true;
        this.fileListfile2 = fileList;
        this.upLoadKey(file.uid, file.name,'file2');
        }else{
        this.flag = false;
        this.fileListfile2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`); 
        }
      }else{
        this.flag = false;
        this.fileListfile2 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListfile2);
    },
    //上传文件3
    upLoadProfile3(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf'|| this.fileName == 'doc' || this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){
        if(isLt20M){
        this.flag = true;
        this.fileListfile3 = fileList;
        this.upLoadKey(file.uid, file.name,'file3');
        }else{
        this.flag = false;
        this.fileListfile3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`); 
        }
      }else{
        this.flag = false;
        this.fileListfile3 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListfile3);
    },
    //上传文件4
    upLoadProfile4(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf'|| this.fileName == 'doc' || this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){
        if(isLt20M){
        this.flag = true;
        this.fileListfile4 = fileList;
        this.upLoadKey(file.uid, file.name,'file4');
        }else{
        this.flag = false;
        this.fileListfile4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`); 
        }
      }else{
        this.flag = false;
        this.fileListfile4 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListfile4);
    },
    //上传文件5
    upLoadProfile5(file,fileList){
      let isLt20M = file.size / 1024 / 1024 < 20;
      this.files = file.raw;
      this.fileName = file.name.substring(file.name.lastIndexOf('.')+1);
      if(this.fileName =='jpg' || this.fileName == 'png' || this.fileName == 'pdf' || this.fileName == 'doc'|| this.fileName == 'docx' || this.fileName == 'xlsx' || this.fileName =='pptx' || this.fileName == 'rar'|| this.fileName == 'word'){
        if(isLt20M){
        this.flag = true;
        this.fileListfile5 = fileList;
        this.upLoadKey(file.uid, file.name,'file5');
        }else{
        this.flag = false;
        this.fileListfile5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`文件大小超限`); 
        }
      }else{
        this.flag = false;
        this.fileListfile5 =  fileList.slice(0, fileList.length-1);
        this.$message.warning(`当前文件格式不正确`);	
      }
      console.log(this.fileListfile5);
    },                
   
    upLoadFile(fileId, fileListName,type){ 
      let that = this;
      console.log(this.files)
       // let key = fileId + '.' + this.fileName;
       let key = this.files.name;
        this.client.multipartUpload(key, this.files, {}).then(res => {
          this.fileUrl = res.url ? res.url : 'http://'+ res.bucket + '.oss-cn-beijing.aliyuncs.com/' + res.name;
          this.fileArr.push(this.fileUrl)
          console.log(this.fileUrl, this.fileArr);
         if(type=='img'){
           this.imgListarr.push(this.fileUrl);
         }else if(type=='video'){
            this.videoListarr.push(this.fileUrl);
         }else if(type=='file'){
           this.fileListarr.push(this.fileUrl);
         }else if(type=='img2'){
           this.imgListarr2.push(this.fileUrl);
         }else if(type=='img3'){
           this.imgListarr3.push(this.fileUrl);
         }else if(type=='img4'){
           this.imgListarr4.push(this.fileUrl);
         }else if(type=='img5'){
           this.imgListarr5.push(this.fileUrl);
         }else if(type=='video2'){
           this.videoListarr3.push(this.fileUrl);
         }else if(type=='video3'){
           this.videoListarr3.push(this.fileUrl);
         }else if(type=='video4'){
           this.videoListarr4.push(this.fileUrl);
         }else if(type=='video5'){
           this.videoListarr5.push(this.fileUrl);
         }else if(type=='file2'){
           this.fileListarr2.push(this.fileUrl);
         }else if(type=='file3'){
           this.fileListarr3.push(this.fileUrl);
         }else if(type=='file4'){
           this.fileListarr4.push(this.fileUrl);
         }else if(type=='file5'){
           this.fileListarr5.push(this.fileUrl);
         }
        }, error => {
          this.prompt('上传文件失败','warning');
        })
    },
    //图片上传
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    
      },
      submitistypecode(){
        let content = {};
        let kg = 0;
        this.data_sb.result.templateMap.commonArray.map( item=>{
            if(item.isNull==1&&!item.value){
                if(item.fieldType==1||item.fieldType==2||item.fieldType==3||item.fieldType==7||item.fieldType==8){
                    this.$message.error(item.chineseName+'不能为空');
                    kg = 1;   
                }
            }  
        });
        if(kg==0){
        content.examine = [];     
        content.tableData =  this.data_sb.result.templateMap.commonArray;
        content.imgListarr = this.imgListarr;
        content.imgListarr2 = this.imgListarr2;
        content.imgListarr3=this.imgListarr3;
        content.imgListarr4=this.imgListarr4;
        content.imgListarr5=this.imgListarr5;
        content.videoListarr=this.videoListarr;
        content.videoListarr2=this.videoListarr2;
        content.videoListarr3=this.videoListarr3;
        content.videoListarr4=this.videoListarr4;
        content.videoListarr5=this.videoListarr5;
        content.fileListarr=this.fileListarr;
        content.fileListarr2=this.fileListarr2;
        content.fileListarr3=this.fileListarr3;
        content.fileListarr4=this.fileListarr4;
        content.fileListarr5=this.fileListarr5;
                                    
        if(this.data_sb.result.typeCode=='WATER_ELECTRICITY'){
              content.examine =this.data_sb.result.templateMap.customTempleArray;
        }else{
            content.examine=[];
        }
        if(this.data_sb.result.typeCode =='DESIGN'){
            content.data_Detail = this.data_Detail;
        }else{
            content.data_Detail =[];
        }
        this.paramsData.missionId = parseInt(this.$route.params.id) ; //工单id
        let paramJson = JSON.stringify({
          status:3,
          missionId:parseInt(this.$route.params.id),
          contentJson:content,
        });

        this.detailData.personOper = true;
        this.axios.post('/mission/missionOperation', {
            paramJson:paramJson
          }).then(res => {
                  this.$message.success('操作成功');
                            setTimeout(time => {
                                this.$router.push({ path: "/home/tasklist" });
                              }, 1000);
      }).catch( res => {
          this.$message.error(res.data.info);
      })
      }
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
      console.log(this.data_Detail);
    

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
    upLoadKey(fileId, fileName,type){
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
        this.upLoadFile(fileId, fileName,type);
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
          this.data_sb = res.data;
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
        //this.axios.post('/mission/historyLog', {
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
    }

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
