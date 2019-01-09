<template>
  <div class="app-container" style="padding-top: 45px;">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="广告标题">
    <el-input type="text" v-model="ruleForm2.title"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="状态">
	  <el-radio-group v-model="ruleForm2.status">
	    <el-radio :label="1">有效</el-radio>
	    <el-radio :label="2">过期</el-radio>
	    <el-radio :label="3">删除</el-radio>
	  </el-radio-group>
   </el-form-item>
    <el-form-item label="广告开始时间">
    <el-date-picker
      v-model="ruleForm2.startTime"
      type="datetime"
      format="yyyy-MM-dd HH:mm:00"
      placeholder="选择日期时间"
      default-time="12:00:00"
      @change="test"
      >
    </el-date-picker>
    </el-form-item>
    <el-form-item label="广告结束时间">
    	 <el-date-picker
      v-model="ruleForm2.endTime"
      type="datetime"
      format="yyyy-MM-dd HH:mm:00"
      placeholder="选择日期时间"
      default-time="12:00:00">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="广告图片上传">
	  <el-upload
	  class="avatar-uploader"
	  action="/api/configure/uploader"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  style='border:1px solid #dcdfe6;width: 178px;height:178px;'
	  >
	  <img v-if="ruleForm2.imageUrl" :src="ruleForm2.imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
	  </el-form-item>
	   <el-form-item label="图片链接">
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
import {addData,dataList,detailData} from '@/api/operate'

export default{
  name: 'DirectivePermission',
  data() {
    return {
     addUrl:'/api/advertisingAdmin/doAdvertisingInfo',
     listUrl:'/api/advertisingAdmin/selectAdvertisingPlace',
     detailUrl:'/api/advertisingAdmin/findAdvertisingInfoById',
     ruleForm2:{
      title:'',
      status:1,
      imageUrl:'',
      jumpUrl:'',
      startTime:'',
      endTime:'',
      placeId:'',
     },
     placeId:'',
     value6:'',
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
  	handleAvatarSuccess(res, file) {
        this.ruleForm2.imageUrl = res;
      },
      test(val){
      	 this.ruleForm2.startTime = val;
      },
      test1(val){
      	 this.ruleForm2.endTime = val;
      },
//    beforeAvatarUpload(file) {
//      const isJPG = file.type === 'image/jpeg'&&'image/png';
//      const isLt2M = file.size / 1024 / 1024 < 2;
//
//      if (!isJPG) {
//        this.$message.error('上传头像图片只能是 JPG 格式!');
//      }
//      if (!isLt2M) {
//        this.$message.error('上传头像图片大小不能超过 2MB!');
//      }
//      return isJPG && isLt2M;
//    },
    //获取类型列表
   getTypeList() {
    	dataList('',this.listUrl).then(response => {
        this.typeList=response.data.data;
     })
		},
		submitForm(){
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/operate/adver',query:{placeId:this.ruleForm2.placeId}});
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
      this.ruleForm2.placeId=this.$route.query.placeId;
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