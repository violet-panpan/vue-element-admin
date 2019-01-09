<template>
  <div class="app-container" style="padding-top: 40px;">
   <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="姓名">
    <el-input type="text" v-model="ruleForm2.username" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="账号类型">
  <el-select v-model="ruleForm2.roleId" placeholder="请选择" >
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="状态修改">
	  <el-radio-group v-model="ruleForm2.status">
	    <el-radio :label="1">启用</el-radio>
	    <el-radio :label="0">禁用</el-radio>
	  </el-radio-group>
   </el-form-item>
  <el-form-item label="确认密码">
    <el-input type="password" v-model="ruleForm2.password" autocomplete="off" style="width: 30%;"></el-input>
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
     addUrl:'/api/sysAdmin/doSysUser',
     listUrl:'/api/sysAdmin/findSysRoleList',
     detailUrl:'/api/sysAdmin/findSysUserById',
     ruleForm2:{
     	roleId:'',	
     	username:'',
     	password:'',
     	status:'',
     },
     id:'',
     token:'',
     roleList:[],
     btnTxt:'增加',
     pageSize:10,
	   curPage:1,
    }
  },
  methods: {
		//获取角色列表
		 getRoleList() {
		 	dataList('',this.listUrl).then(response => {
         this.roleList=response.data.data.items;
    })
		},
		//提交按钮
    submitForm(){
    	addUser(this.ruleForm2,this.addUrl,this.token).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/system/user'});
     }
    })
    },
    //清空按钮
    resetForm(){
    	this.ruleForm2={};
    },
  },
  created() {
      this.getRoleList();
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
  	width: 30%;
  }
}
</style>

