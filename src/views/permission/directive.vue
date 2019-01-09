<template>
  <div class="app-container">
   <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名">
    <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码">
    <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
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
     	roleId:'1',	
     	username:'',
     	password:''
     },
    }
  },
  methods: {
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
    submitForm(){
    	 console.log(this.ruleForm2);
    	  return request({
		    url: '/api/sys/doSysUser',
		    method: 'post',
		    data:this.ruleForm2
		    }).then(response => {
		    	if(response.data.data.success){
		    	this.$message({
          showClose: true,
          message: '添加成功'
        });
		    	}
       })
    },
  }
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
}
</style>

