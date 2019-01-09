<template>
  <div class="app-container" style="padding-top:40px;">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="特征名称">
    <el-input type="text" v-model="ruleForm2.name"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="特征别名">
    <el-input type="text" v-model="ruleForm2.alias"  style="width: 30%;"></el-input>
  </el-form-item>
	<el-form-item label="特征描述">
    <el-input 
    	type="textarea"
		  :rows="2"
		  placeholder="请输入内容"
		   v-model="ruleForm2.description" 
		    style="width: 30%;">
    </el-input>
  </el-form-item>
  <el-form-item label="排序">
    <el-input type="text" v-model="ruleForm2.orders"  style="width: 30%;"></el-input>
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
     addUrl:'/api/featureAdmin/doFeatureType',
     detailUrl:'/api/featureAdmin/findFeatureTypeById',
     ruleForm2:{
     orders:'',
     name:'',
     fatherId:0,
     description:'',
     alias:'',
     },
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
        this.$router.push({path:'/operate/features'});
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