<template>
  <div class="app-container">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm" style="padding-top: 30px;"
  	>
  <!--<el-form-item label="消息类型">
  <el-select v-model="ruleForm2.type" placeholder="请选择" >
    <el-option
      v-for="item in typeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>-->
  <el-form-item label="标题">
    <el-input type="text" v-model="ruleForm2.title" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="消息链接">
    <el-input type="text" v-model="ruleForm2.jumpUrl" autocomplete="off" style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="图片上传" v-if='ruleForm2.type==0'>
  <el-upload
  class="avatar-uploader"
  action="/api/configure/uploader"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  style='border:1px solid #dcdfe6;width: 178px;height:178px;'
  >
  
  <img v-if="ruleForm2.imageUrl" :src="ruleForm2.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  <el-form-item label="活动截止时间" v-if='ruleForm2.type==0'>
    	<el-date-picker
      v-model="ruleForm2.endTime"
      type="datetime"
      format="yyyy-MM-dd HH:mm:00"
      placeholder="选择日期时间"
      default-time="12:00:00"
      @change="test"
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="内容">
  	<el-input
		  type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		  v-model="ruleForm2.content"
		  style="width: 30%;"
		  >
   </el-input>
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
    addUrl:'/api/messageAdmin/doMessage',
    detailUrl:'/api/messageAdmin/deleteMessage',
     ruleForm2:{
      endTime:'',
      title:'',
      content:'',
      jumpUrl:'',
      imageUrl:'',
      userId:0,
      type:0,
      uid:[],
      user:{},
     },
     id:'',
     typeList:[{id:0,name:'系统消息'},{id:1,name:'用户消息'},],
     roleList:[],
     btnTxt:'增加',
     imgInfo:{
     	token:'',
     	name:'',
     }
    }
  },
  methods: {
  	  handleAvatarSuccess(res, file) {
        this.ruleForm2.imageUrl = res;
      },
      test(val){
      	 this.ruleForm2.endTime = val;
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
      if(this.$route.query.type==0){
      this.ruleForm2.uid=[];
      this.ruleForm2.user={};
      }
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/operate/info'});
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
      if(this.$route.query.type!=null){
      	 this.ruleForm2.type=this.$route.query.type;
      	 this.ruleForm2.user=this.$route.query.user;
      	 var ss=this.$route.query.user;
      	 console.log(this.ruleForm2.user);
      	 this.ruleForm2.uid=this.$route.query.list;
      }else{
      	this.ruleForm2.uid=[];
      	this.ruleForm2.user={};
      }
      if(this.$route.query.userId!=null){
      	this.ruleForm2.userId=this.$route.query.userId;
      }
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

