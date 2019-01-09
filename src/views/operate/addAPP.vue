<template>
  <div class="app-container">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm" style="padding-top:20px;">
  <el-form-item lable="平台名称">
  	<el-select v-model="ruleForm2.platform" placeholder="请选择" >
	    <el-option
	      v-for="item in dateList"
	      :label="item"
	      :value="item">
	    </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="APP名称">
    <el-input type="text" v-model="ruleForm2.marketName"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="APP包名">
    <el-input type="text" v-model="ruleForm2.bundleId"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="市场编号">
    <el-input type="text" v-model="ruleForm2.marketId"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="下载地址">
    <el-input type="text" v-model="ruleForm2.versionUrl"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {addData,dataList,detailData} from '@/api/operate'

export default{
  name: 'DirectivePermission',
  data() {
    return {
    	addUrl:'/api/appAdmin/doAppInfo',
      detailUrl:'/api/appAdmin/findAppInfoById',
      ruleForm2:{
      platform:'',
      bundleId:'',
      marketName:'',
      marketID:'',
      versionUrl:'',
     },
     id:'',
     typeList:[],
     dateList:["苹果",'安卓'],
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
       this.$router.push({path:'/operate/appList'});
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
      if(this.id!=null){
      this.btnTxt='更新';
      detailData(this.id,this.detailUrl).then(response => {
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
  	width: 50%;
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

