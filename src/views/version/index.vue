<template>
  <div class="app-container" style="padding-top: 40px;">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="IOS版本">
  	<el-input type="text" v-model="ruleForm2.content.iosVersion" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="安卓版本">
  <el-input type="text" v-model="ruleForm2.content.androidVersion" @blur="watchVal" style="width: 30%;"></el-input>
  </el-form-item>
   	<div style="margin-bottom: 10px;" v-for="item in ruleForm2.content.list">
   	<span style="display: inline-block;margin-left: 150px;width: 45px;color: #606266;font-size: 14px;">{{item.name}}</span>
  	<el-input type="text" placeholder="输入版本号"  v-model="item.version" style="width: 150px;"></el-input>
  	</div>
  <el-form-item label="开关">
	  <el-radio-group v-model="ruleForm2.content.open">
	    <el-radio :label="1">开</el-radio>
	    <el-radio :label="0">关</el-radio>
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
import {addData,dataList,detailData} from '@/api/operate'
export default{
  name: 'DirectivePermission',
  data() {
    return {
     addUrl:'/api/sysAdmin/doSysConf',
     listUrl:'/api/sysAdmin/findFeatureInfo',
     listUrl1:'/api/sysAdmin/findSysConfList',
     detailUrl:'/api/sysAdmin/findSysConfList',
     version:'',
     ruleForm2:{
     	  content:{
       	list:[
       	],
       	iosVersion:'',
       	androidVersion:'',	
        open:0,
        },
        id:1,
     },
     version:'',
     id:1,
     typeList:[],
     arr:[],
     btnTxt:'保存',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
  	watchVal(val){
  		var that=this;
      var arr=that.ruleForm2.content.list.map(function(obj,index){
        	var rObj={};
        	rObj.version=that.ruleForm2.content.androidVersion;
        	rObj.name = obj.name;
        	rObj.value = obj.value;
        	return rObj;
       });
       that.ruleForm2.content.list=arr;
  	},
    //获取类型列表
    getTypeList() {
    	var that=this;
    	dataList('',this.listUrl).then(response => {
        this.typeList=response.data.data;
        var arr=this.typeList.map(function(obj,index){
        	var rObj={};
        	rObj.version=that.ruleForm2.androidVersion;
        	rObj.name = obj.VALUE;
        	rObj.value = obj.name;
        	return rObj;
        });
        this.ruleForm2.content.list=arr;
     })
		},
		//提交按钮
    submitForm(){
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
      });
       this.getDetail();
     }
      })
    },
    getDetail(){
    	this.btnTxt='更新';
      detailData(this.id,this.detailUrl).then(response => {
      	console.log(response.data.data+'呼呼');
      	if(response.data.data!=null){
      			this.ruleForm2.content=response.data.data;
      			this.ruleForm2.content.list=response.data.data.list;
      			console.log(this.ruleForm2.content.list);
      			this.ruleForm2.id=response.data.id;
      	}else{
      		this.getTypeList();
      	}
      }) 
    },
    //清空按钮
    resetForm(){
    	this.ruleForm2.content.iosVersion='';
    	this.ruleForm2.content.androidVersion='';
    	this.ruleForm2.content.open=0;
    	this.getTypeList();
    	
    },
  },
  watch: {
//	'ruleForm2.content.androidVersion':function(val){
//		console.log(val);
//		var that=this;
//    var arr=that.ruleForm2.content.list.map(function(obj,index){
//      	var rObj={};
//      	rObj.version=val;
//      	rObj.name = obj.name;
//      	rObj.value = obj.value;
//      	return rObj;
//     });
//     that.ruleForm2.content.list=arr;
//	}
    

  },
  created() {
//	  this.getTypeList();
	    this.getDetail();
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

