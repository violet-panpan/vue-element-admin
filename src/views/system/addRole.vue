<template>
  <div class="app-container" style="padding-top: 40px;">
   <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="角色名">
    <el-input type="text" v-model="ruleForm2.roleName" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="简介">
  	<el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="ruleForm2.introduction"
		  style="width: 30%;"
		  >
   </el-input>
  </el-form-item>
  <el-form-item label="头像上传">
  <el-upload
  class="avatar-uploader"
  action="/api/configure/uploader"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  style='border:1px solid #dcdfe6;width: 178px;height:178px;'
  >
  
  <img v-if="ruleForm2.avatar" :src="ruleForm2.avatar" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {addUser,dataList,detailData} from '@/api/operate'

export default{
  name: 'DirectivePermission',
  data() {
    return {
    	addUrl:'/api/sysAdmin/doSysRole',
      detailUrl:'/api/sysAdmin/findSysRoleById',
     ruleForm2:{
     	roleName:'',	
     	introduction:'',
     	avatar:'',
     },
     id:'',
     btnTxt:'增加',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
  	  handleAvatarSuccess(res, file) {
        this.ruleForm2.avatar = res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
		//提交按钮
    submitForm(){
    	addUser(this.ruleForm2,this.addUrl,this.token).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/system/role'});
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
        if(response.data.token!=null){
        	this.token=response.data.token;
        }else{
        	this.token='';
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
}
</style>

