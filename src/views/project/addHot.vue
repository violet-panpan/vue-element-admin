<template>
  <div class="app-container">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
  <el-form-item label="图标上传">
  <el-upload
  class="avatar-uploader"
  action="/api/configure/uploader"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  style='border:1px solid #dcdfe6;width: 100px;height:100px;'
  >
  <img v-if="ruleForm2.iconUrl" :src="ruleForm2.iconUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
   <el-form-item label="名称">
    <el-input type="text" v-model="ruleForm2.name"  style="width: 30%;"></el-input>
  </el-form-item>
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
  <el-form-item label="借款金额范围">
    <el-input type="text" placeholder="最小金额" v-model="ruleForm2.amountMin"  style="width: 120px;"></el-input>
    <span style="color:#dcdfe6">——</span>
    <el-input type="text" placeholder="最大金额" v-model="ruleForm2.amountMax"  style="width: 120px;"></el-input>
    <span style="margin-left: 10px;">如：1000-5000元</span>
  </el-form-item>
  <el-form-item label="借款期限范围">
    <el-input type="text" placeholder="最小期限" v-model="ruleForm2.termMin"  style="width: 120px;"></el-input>
    <span style="color:#dcdfe6">——</span>
    <el-input type="text" placeholder="最大期限" v-model="ruleForm2.termMax"  style="width: 120px;"></el-input>
     <el-select v-model="ruleForm2.termUnit" placeholder="请选择" >
    <el-option
      v-for="item in dateList"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
    <span style="margin-left: 10px;">如：1-15天</span>
  </el-form-item>
  <el-form-item label="借款利率">
  <el-input type="text" placeholder="如0.2%-0.7%" v-model="ruleForm2.rate"  style="width: 200px;"></el-input>
  <el-select v-model="ruleForm2.rateUnit" placeholder="请选择" >
    <el-option
      v-for="item in dateList"
      :label="item"
      :value="item">
    </el-option>
  </el-select>
  <span style="margin-left: 10px;">如：0.5%-0.7%</span>
  </el-form-item>
  <el-form-item label="申请人数">
    <el-input type="text" v-model="ruleForm2.totalOrder"  style="width: 200px;"></el-input>
  </el-form-item>
  <el-form-item label="首页排序">
    <el-input type="text" placeholder="请输入数字，数字越小，排序越靠前" v-model="ruleForm2.homeSort"  style="width: 280px;"></el-input>
  </el-form-item>
  <el-form-item label="贷款中心排序">
    <el-input type="text" placeholder="请输入数字，数字越小，排序越靠前" v-model="ruleForm2.listSort"  style="width: 280px;"></el-input>
  </el-form-item>
  <el-form-item label="产品类型">
    <el-select v-model="ruleForm2.typeId" placeholder="请选择" >
    <el-option
      v-for="item in typeList1"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="产品标签">
	  <el-radio-group v-model="ruleForm2.tagId">
	    <el-radio :label="0">无</el-radio>
	    <el-radio :label="1">新品</el-radio>
	    <el-radio :label="2">热门</el-radio>
	  </el-radio-group>
   </el-form-item>
   <el-form-item label="是否下架">
	  <el-radio-group v-model="ruleForm2.status">
	    <el-radio :label="1">否</el-radio>
	    <el-radio :label="0">是</el-radio>
	  </el-radio-group>
   </el-form-item>
   <el-form-item label="是否为推荐产品">
	  <el-radio-group v-model="ruleForm2.recommend">
	    <el-radio :label="1">是</el-radio>
	    <el-radio :label="0">否</el-radio>
	  </el-radio-group>
   </el-form-item>
    <el-form-item label="需认证的资料">
	<el-select v-model="value5" multiple placeholder="请选择" @change="checkList">
    <el-option
      v-for="item in typeList"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
    </el-select>
   </el-form-item>
   <el-form-item label="申请地址">
    <el-input type="text" v-model="ruleForm2.jumpUrl"  style="width: 30%;"></el-input>
  </el-form-item>
  <el-form-item label="统一子页面地址">
    <el-input type="text" v-model="ruleForm2.subpageUrl"  style="width: 30%;"></el-input>
  </el-form-item>
   <el-form-item label="ios子页面地址">
    <el-input type="text" v-model="ruleForm2.iosUrl"  style="width: 30%;"></el-input>
  </el-form-item>
   <el-form-item label="android子页面地址">
    <el-input type="text" v-model="ruleForm2.androidUrl"  style="width: 30%;"></el-input>
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
    value5:[],
     addUrl:'/api/loanProductAdmin/doLoanProd',
     listUrl:'/api/loanProductAdmin/findFeatureInfo',
     detailUrl:'/api/loanProductAdmin/findLoanProdById',
     dateList:['天','月'],
     typeList1:[{id:1,name:'新品上线'},{id:2,name:'热门贷款'},{id:3,name:'通过率高'},],
     ruleForm2:{
       status:1,
       typeId:1,
       iconUrl:'',
       name:'',
       description:'',
       amountMin:'',
       amountMax:'',
       termMin:'',
       termMax:'',
       termUnit:'',
       rate:'',
       rateUnit:'',
       totalOrder:'',
       homeSort:'',
       listSort:'',
       tagId:0,
       recommend:0,
       authorize:'',
       jumpUrl:'',
       subpageUrl:'',
       iosUrl:'',
       androidUrl:'',
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
  	checkList(){
  		this.ruleForm2.authorize=this.value5.join(',');
  	},
  	 handleAvatarSuccess(res, file) {
        this.ruleForm2.iconUrl = res;
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
		//提交按钮
    submitForm(){
    	addData(this.ruleForm2,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/project/hotpro'});
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
        this.value5=this.ruleForm2.authorize.split(',');
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
  /*/deep/ .el-form-item__label{
   width:200px !important;
   }*/
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .el-form-item .el-form-item__label{
  	width: 200px !important;
  }
}
</style>

