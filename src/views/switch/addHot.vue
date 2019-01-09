<template>
  <div class="app-container">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="问题类型">
  <el-select v-model="ruleForm2.typeId" placeholder="请选择" >
    <el-option
      v-for="item in typeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="标题">
    <el-input type="text" v-model="ruleForm2.question"  style="width: 30%;"></el-input>
  </el-form-item>
 <el-form-item label="内容">
  	<el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="ruleForm2.answer"
		  style="width: 30%;"
		  >
   </el-input>
  </el-form-item>
  <el-form-item label="猜你是否想问">
	  <el-radio-group v-model="ruleForm2.recommend">
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
import request from '@/utils/request'
import {addData,dataList,detailData} from '@/api/operate'
export default{
  name: 'DirectivePermission',
  data() {
    return {
     addUrl:'/api/qaAdmin/doQaInfo',
     listUrl:'/api/qaAdmin/findQaTypeList',
     detailUrl:'/api/qaAdmin/findQaInfoById',
     ruleForm2:{
      question:'',
      answer:'',
     	typeId:'',
     	recommend:'',
     },
     id:'',
     typeList:[],
     btnTxt:'增加',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
    //获取类型列表
    getTypeList() {
    	dataList('',this.listUrl).then(response => {
        this.typeList=response.data.data.items;
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
        this.$router.push({path:'/operate/question'});
     }
    })
    },
    //清空按钮
    resetForm(){
    	this.ruleForm2={};
    },
  },
  created() {
  	  this.getTypeList();
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

