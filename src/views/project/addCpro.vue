<template>
  <div class="app-container" style="padding-top: 40px;">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="220px" class="demo-ruleForm">
	 <el-form-item label="描述">
	  	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  v-model="ruleForm2.description"
			  style="width: 30%;"
			  >
	   </el-input>
	  </el-form-item>
	  <el-form-item label="借款金额">
     <el-input type="text" v-model="ruleForm2.amountRange"  style="width: 30%;"></el-input>
    </el-form-item>
     <el-form-item label="借款期限">
     <el-input type="text" v-model="ruleForm2.timeLimit"  style="width: 30%;"></el-input>
    </el-form-item>
    <el-form-item label="借款利率（天）">
     <el-input type="text" v-model="ruleForm2.rate"  style="width: 30%;"></el-input>
    </el-form-item>
  <el-form-item label="展示按钮（可多选）" class="labelBox">
	<el-checkbox-group   v-model="checkList" class="checkgroup" >
  	<el-checkbox :label="item.id" @change="checkinlist" :value="item.id" v-for="item in itemList" :key="item.id">{{item.name}}</el-checkbox>
 </el-checkbox-group>
   </el-form-item>
   <el-form-item label="跳转网址">
     <el-input type="text" v-model="ruleForm2.jumpUrl"  style="width: 30%;"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
import {addData,dataList,detailData} from '@/api/operate'
export default{
  name: 'DirectivePermission',
  data() {
    return {
     checkList:[],
     addUrl:'/api/loanProductAdmin/doLoanCInfo',
     detailUrl:'/api/loanProductAdmin/findLoanCInfoById',
     ruleForm2:{
      amountRange:'',
      timeLimit:'',
      rate:'',
      description:"",
      displayMode:0,
      jumpUrl:'',
     },
     id:'',
     typeList:[],
     itemList:[{id:1,name:'立即申请'},{id:2,name:'线下大额贷'},],
     btnTxt:'增加',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
  	checkinlist(){
        if(this.checkList.length==1){
          this.ruleForm2.displayMode=this.checkList[0];
        }else if(this.checkList.length==2){
        	this.ruleForm2.displayMode=3;
        }else{
        	this.ruleForm2.displayMode=0;
        }
     },
		//提交按钮
    submitForm(){
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/project/cpro'});
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
        if(this.ruleForm2.displayMode==1){
        	this.checkList=[1];
        }else if(this.ruleForm2.displayMode==2){
        	this.checkList=[2];
        }else if(this.ruleForm2.displayMode==3){
        	this.checkList=[1,2];
        }else{
        	this.checkList=[];
        }
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
  .labelBox .el-form-item--medium .el-form-item__label {
    border: 1px solid red;
  }
}
</style>

