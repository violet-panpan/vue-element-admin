<template>
  <div class="app-container">
   <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="角色名">
    <el-input type="text" v-model="ruleForm2.roleName" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="简介">
    <el-input type="text" v-model="ruleForm2.introduction" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item>
  <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  style='border:1px solid #dcdfe6;width: 180px;'
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
import request from '@/utils/request'

export default{
  name: 'DirectivePermission',
  data() {
    return {
     ruleForm2:{
     	roleName:'',	
     	introduction:'',
     	avatar:'',
     	id:'',
     },
     id:'',
     roleList:[],
     btnTxt:'增加',
    }
  },
  methods: {
  	  handleAvatarSuccess(res, file) {
        this.ruleForm2.avatar = URL.createObjectURL(file.raw);
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
     getUserList() {
		  return request({
		    url: '/api/sys/findSysUserList',
		    method: 'get',
		    params:{
		    	index:this.curPage,
		    	size:this.pageSize
		    },
		    
		  }).then(response => {
        console.log(response.data.data.items);
        this.tableData=response.data.data.items;
       })
		},
		//获取角色列表
		 getRoleList() {
		  return request({
		    url: '/api/sys/findSysRoleList',
		    method: 'get',
		    params:{
		    	index:1,
		    	size:10
		    },
		    
		  }).then(response => {
        console.log(response.data.data.items);
        this.roleList=response.data.data.items;
       })
		},
		//提交按钮
    submitForm(){
    	 console.log(this.ruleForm2);
    	let param = new URLSearchParams()
			param.append('username', this.ruleForm2.username)
			param.append('roleId', this.ruleForm2.roleId)
			param.append('password', this.ruleForm2.password)
			param.append('id', this.ruleForm2.id)
    	  return request({
		    url: '/api/sys/doSysUser',
		    method: 'post',
		    data:param
		    }).then(response => {
		    	console.log(response.data.statusCode);
		    	if(response.data.statusCode==200){
		    	this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/permission/page'});
		    	}
       })
    },
    //清空按钮
    resetForm(){
    	this.ruleForm2={};
    },
  },
  created() {
      this.getUserList();
      this.getRoleList();
      this.id=this.$route.query.id;
      if(this.id!=null){
      	this.btnTxt='更新';
      	return request({
		    url: '/api/sys/findSysUserById',
		    method: 'get',
		    params:{
		    	id:this.id
		    },
		  }).then(response => {
		  	this.ruleForm2=response.data.data;
      })
      }else{
      	console.log('我是增加');
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
  	width: 30%;
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

