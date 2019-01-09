<template>
  <div class="app-container" style="padding-top: 50px;">
  <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="200px" class="demo-ruleForm">
   <el-form-item label="选择字体颜色样式">
    <button class="cbtn" v-for="item in fontColor" @click.prevent="setStyle(4,item)" :style="{backgroundColor:item}"></button>
   </el-form-item>
   <el-form-item label="选择背景颜色样式">
    <button class="cbtn" v-for="items in bgColor" @click.prevent="setStyle(5,items)" :style="{backgroundColor:items}"></button>
   </el-form-item>
   <el-form-item label="其他样式">
   	<el-button @click.prevent="setStyle(2)">加粗</el-button>
    <el-button @click.prevent="setStyle(3)">加斜体</el-button>
    <el-button @click.prevent="empty">清空样式</el-button>
   	</el-form-item>
   <el-form-item label="编辑内容">
		 <input type="text" @click="getSelection()" style="width: 500px;height:50px;padding-left: 15px;" ref="input1" v-model="noticeList.content"/>
  </el-form-item>
  <el-form-item label="编辑效果">
		 <div type="text"  v-html='showDiv'></div>
  </el-form-item>
  <el-form-item label="是否显示">
	  <el-radio-group v-model="noticeList.status">
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
import ThemePicker from '@/components/ThemePicker'
import edit from '@/components/edit'
export default{
  name: 'DirectivePermission',
  components: {
    ThemePicker,
    edit
  },
  data() {
    return {
    	fontColor:['#F41E06','#EA610D',' #38C840','#409EFF','#E6BE46','#EAEE0E','#515148','#FFFFFF'],
    	bgColor:['#F41E06','#EA610D',' #38C840','#409EFF','#E6BE46','#EAEE0E','#FFFFFF'],
    	noticeList:{
    		status:0,
    		content:'',
    		style:[],
    	},
    	subTxt:'',
      list:[{location:0,len:2},{location:0,len:3},{location:1,len:1}],
      test:{
      	location:'',
      	len:'',
      },
    	styles:{
    		location:0,
    		length:0,	
    		mode:'',
    		value:'',
    		text:'',
    	},
    	showDiv:'',
    	isActive:false,
    	chalk: '',
	     addUrl:'/api/noticeAdmin/doNotice',
	     listUrl:'/api/qaAdmin/findQaTypeList',
	     detailUrl:'/api/noticeAdmin/findNoticeById',
	     ruleForm2:{
	      status:1,
	      content:"",
	      style:[],
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
  	setStyle(mode, value) {
  		var that=this;
			switch(mode){
				case 1:
					document.execCommand("fontsize", "false", value);
					break;
				case 2:
				  document.execCommand("bold", "false", null);
				  
					break;
				case 3:
					document.execCommand("italic", "false", null);
					break;
				case 4:
					document.execCommand("forecolor", "false", value);
					break;
				case 5:
					document.execCommand("backcolor", "false", value);
					break;				
				default:
				  that.$refs.div1.innerHTML=that.noticeList.content;
					break;
			}
			console.log(this.styles);
			this.styles.mode = mode;
			this.styles.value = value;
			this.noticeList.style.push(this.styles);
			var str=this.noticeList.content;
			this.showDiv=this.setTest(str,this.noticeList.style,this.showDiv);
		},
		getSelectionText(){
  	 	var selection = window.getSelection();
	 	  console.log(selection);
	 	  var ss = selection.toString();
  	 	if (selection) {
  	 		var anchor = selection.anchorOffset, focus = selection.focusOffset;
  	 		if (anchor == 0 && focus == 0) {
  	 			
  	 		} else {
	  	 		this.styles = {mode:0};
				  this.styles.location = (focus > anchor ? anchor : focus);
				  this.styles.length = Math.abs(anchor-focus);
				  this.styles.text = selection.toString();
			  }
  	 	} else {
  	 		alert("不支持此浏览器")
  	 	}
  	 	
  	 	
    },
		getSelection(){
			var input1=this.$refs.input1;
			var curPos=input1.selectionStart;
			var curEnd=input1.selectionEnd;
			this.subTxt=input1.value.substring(curPos,curEnd);
			this.styles = {mode:0};
			this.styles.location = (curPos > curEnd? curEnd : curPos);
			this.styles.length = Math.abs(curPos-curEnd);
			console.log(this.styles);
		},
		setTest(str,styles,showDiv){
			if(showDiv.length>0){
				var string=showDiv;
			}else{
				var string=str;
			}
			var len=0;
			for(let j=0;j<styles.length;j++){
				var mode=styles[j].mode;
		  	var value=styles[j].value;
		  	var length=styles[j].length;
		  	var location=styles[j].location*1;
		  	var subStr=str.substr(location,length);
			  console.log(subStr+'第一层');
			  string=this.setStrMarke(string,subStr,mode,value);
		 }
			console.log(string+'第一层结果');
			return string;
		},
	setStrMarke(str,subStr,mode,value){
		    var string='';
		    	if(mode==2){
					var s='<b>'+subStr+'</b>';
					}else if(mode==3){
					var s='<i>'+subStr+'</i>';
			   	}else if(mode==4){
			   		var s='<font color='+value+'>'+subStr+'</font>';
			   	}else if(mode==5){
			   		var s='<span style="background-color:'+value+'"'+'>'+subStr+'</span>'
			   	}
			string = str.replace(subStr,s);		
			console.log(string+'第二层结果');
			return string;
 },
		delHtmlTag(str){
	    return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
	 },
	empty(){
    this.showDiv=this.noticeList.content;
	},

    //获取类型列表
    getTypeList() {
    	dataList('',this.listUrl).then(response => {
        this.typeList=response.data.data.items;
     })
		},
		//提交按钮
    submitForm(){
    	addData(this.noticeList,this.addUrl,this.id).then(response =>{
    		if(response.data.statusCode==200){
		    this.$message({
          showClose: true,
          message: '操作成功' 
        });
        this.$router.push({path:'/operate/notice'});
     }
    })
    },
    //清空按钮
    resetForm(){
    	this.ruleForm2={};
    },
    hh(){
    	console.log('ddd');
    },
  },
  watch: {
  	'noticeList.content':function(val){
  		this.showDiv=this.setTest(val,this.noticeList.style,val);
  	}
  },
  created() {
  	  this.getTypeList();
      this.id=this.$route.query.id;
      this.noticeList.style=[];
      if(this.id!=null){
      this.btnTxt='更新';
      detailData(this.id,this.detailUrl).then(response => {
      this.noticeList=response.data.data;
      var str=this.noticeList.content;
			this.showDiv=this.setTest(str,this.noticeList.style,this.showDiv);
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
  .cbtn{
  	border:none;
  	height: 20px;
  	width: 25px;
  	margin-top: 10px;
  	margin-right: 10px;
  	border: 1px solid #82878C;
  }
  .div1{
  	width:60%;
  	height: 60px;
  	line-height: 20px;
  	border: 1px solid rgb(204, 204, 204);
  	padding:5px;
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
  .theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
.color-box{
	float: left;
	margin-right: 20px;
}
.active{
	font-style: normal !important;
	font-weight: normal !important;
	font-size: 14px !important;
	color:#4D4D4D !important;
	background-color: #ffffff;
}
}
</style>

