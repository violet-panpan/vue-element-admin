<template>
  <div class="app-container">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="构建版本">
    <el-input type="text" placeholder="请输入数字" v-model="ruleForm2.buildVersion"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="版本名称">
    <el-input type="text" v-model="ruleForm2.nameVersion"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="版本内容">
  	<el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="ruleForm2.releaseNotes"
		  style="width: 30%;"
		  >
    </el-input>
  </el-form-item>
  <el-form-item label="下载地址">
    <el-input type="text" v-model="ruleForm2.downloadUrl"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="强制更新">
	  <el-radio-group v-model="ruleForm2.forcibly">
	    <el-radio :label="1">是</el-radio>
	    <el-radio :label="0">否</el-radio>
	  </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {addData,dataList,detailData1} from '@/api/operate'

export default{
  name: 'DirectivePermission',
  data() {
    return {
    	addUrl:'/api/appAdmin/doAppVersion',
      detailUrl:'/api/appAdmin/findAppVersionById',
      ruleForm2:{
      forcibly:0,
      nameVersion:'',
      buildVersion:'',
      releaseNotes:'',
      downloadUrl:'',
      infoId:'',
     },
     id:'',
     marketName:'',
     typeList:[],
     btnTxt:'增加',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
		//提交按钮
		 submitForm(){
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
       this.$router.push({path:'/operate/oldList',query:{id:this.ruleForm2.infoId,marketName:this.marketName}});
     }
    })
   },
    //清空按钮
    resetForm(){
    	this.ruleForm2={};
    	
    },
  },
  created() {
      this.id=this.$route.query.id;
      this.marketName=this.$route.query.marketName
      this.ruleForm2.infoId=this.$route.query.appId;
//    if(this.ruleForm2.infoId!=null&&this.id==null){
//    this.id=0;
//    detailData1(this.id,this.ruleForm2.infoId,this.detailUrl).then(response => {
//      console.log(response.data.data);
//        this.ruleForm2=response.data.data.model;
//    })
//    }else if(this.id!=null){
	if(this.id!=null){
       this.id=this.$route.query.id;
      this.btnTxt='更新';
      detailData1(this.id,this.ruleForm2.infoId,this.detailUrl).then(response => {
        console.log(response.data.data);
          this.ruleForm2=response.data.data;
      })
      }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  /deep/ .permission-alert {
    width: 320px;
    margin-top: 30px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: block;
  }
  /deep/ .permission-tag{
    background-color: #ecf5ff;
  }
  .30{
  	width: 60%;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

