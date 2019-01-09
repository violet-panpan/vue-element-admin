<template>
  <div class="tab-container">
		<el-row :gutter="10">
		  <el-col :span="2" style="margin-left: 43px;">
		  	<div class="grid-content">
		  		 <el-input v-model="pagination.account" placeholder="手机号"></el-input>
		  	</div>
		  </el-col>
		  <el-col :span="2">
		  	<div class="grid-content">
		  		<el-input v-model="pagination.platform" placeholder="系统"></el-input>
		    </div>
		  </el-col>
		  <el-col :span="2">
		  	<div class="grid-content">
		  		<el-input v-model="pagination.appVersion" placeholder="版本号"></el-input>
		    </div>
		  </el-col>
		  <el-col :span="2">
		  	<div class="grid-content">
		  		<el-input v-model="pagination.channel" placeholder="注册来源"></el-input>
		    </div>
		  </el-col>
		  <el-col :span='3.2'>
		  	<div class="grid-content">
		  		<el-date-picker
			      v-model="pagination.begin"
			      type="date"
			      format="yyyy-MM-dd"
			      placeholder="选择开始日期"
			      value-format='yyyy-MM-dd'
			      >
    			</el-date-picker>
		  	</div>
		  </el-col>
		   <el-col :span='3.2'>
		  	<div class="grid-content">
		  		<el-date-picker
			      v-model="pagination.end"
			      type="date"
			      format="yyyy-MM-dd"
			      placeholder="选择结束日期"
			      value-format='yyyy-MM-dd'
			      >
    			</el-date-picker>
		  	</div>
		  </el-col>
		  <el-col :span="0.7" style="margin-left: 10px;">
			  <div class="grid-content">
			  	<el-button icon="el-icon-search" circle @click="search" type="primary"></el-button>
			  </div>
		  </el-col>
		  <el-col :span="1.3">
		  <div class="grid-content">
		  	  <el-button type="primary" @click="fresh" icon='el-icon-refresh' circle></el-button>
		  </div>
		  </el-col>
		    <el-col :span="1.3">
		  	<div class="grid-content">
		  		<el-button type="primary" class='btn' @click="add">消息</el-button>
		  	</div>
		  </el-col>
		</el-row>
  	<el-card class="box-card" style="width: 95%;margin: 0 auto;">
       <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      >
      <el-table-column
      type="selection"
      width="40"
      >
    </el-table-column>
    <el-table-column
      prop="account"
      label="手机号"
      >
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="注册时间"
        :formatter="formatTime"
        width="180">
    </el-table-column>
      </el-table-column>
       <el-table-column
        prop="channel"
        label="注册来源"
        >
      </el-table-column>
      <el-table-column
      prop="platform"
      label="系统"
      >
      </el-table-column>
      <el-table-column
        prop="appVersion"
        label="APP版本"
       >
      </el-table-column>
      <el-table-column
        prop="clickNumber"
        label="H5贷款口子点击数">
      </el-table-column>
      <el-table-column  label="操作" width="100">
      <template slot-scope="scope">
       <el-button @click.stop.prevent="update(scope.row)">消息</el-button>
      </template>
    </el-table-column>
    </el-table>
    </el-card>
    <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :page-size='10'
			  @current-change="handleCurrentChange"
			  style="margin-top:20px;margin-left: 20px;"
			  >
		</el-pagination> 
  </div>
</template>

<script>
import {dataList,delData} from '@/api/operate'
export default{
  name: 'PagePermission',
    data() {
    return {
    	tableData:[],
    	listUrl:'/api/userAdmin/findUserList',
      activeName: 'CN',
      //statusList:[{id:1,name:'ios'},{id:0,name:''},{id:2,name:'全部'},],
      createdTimes: 0,
      pagination:{
	      size:10,
	      index:1,
	      account:'',
	      begin:'',
	      end:'',
	      channel:'',
	      platform:'',
	      appVersion:'',
      },
      list:[],
      total:0,
    }
  },
  methods: {
		add0(m){return m<10?'0'+m:m },
		formatTime(row){
			if(row.createTime!=null){
		    var date =  new Date(row.createTime);
		    var y = 1900+date.getYear();
		    var m = "0"+(date.getMonth()+1);
		    var d = "0"+date.getDate();
		    var h=date.getHours();
		    var mi=date.getMinutes();
		    var s=date.getSeconds();
		    return y+"-"+m.substring(m.length-2,m.length)+"-"+
		    d.substring(d.length-2,d.length)+' '+this.add0(h)+':'+this.add0(mi)+':'+this.add0(s);
		   }
		    else{
		    	return "暂无数据";
		    }
		},
	  handleSelectionChange(val){
	  	this.list=[];
	   for(let va of val){
	   	this.list.push(va.id);
	   }
	   console.log(this.list);
	  },
  search(){
   this.getList();
  },
  fresh(){
  	this.pagination={
	      size:10,
	      index:1,
	      account:'',
	      begin:'',
	      end:'',
	      channel:'',
	      platform:'',
	      appVersion:'',
     };
     this.getList();
  },
   getList() {
    	dataList(this.pagination,this.listUrl).then(response => {
        this.tableData = response.data.data.items;
        this.total=response.data.data.total;
     })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.index=val;
      this.getList();
  },
    update(row){
      	this.$router.push({path:'/operate/editInfo',query:{userId:row.id,type:1}});
    },
    add(){
    	var user={};
    	user.account=this.pagination.account;
    	user.begin=this.pagination.begin;
    	user.end=this.pagination.end;
    	user.channel=this.pagination.channel;
    	user.platform=this.pagination.platform;
    	user.appVersion=this.pagination.appVersion;
    	
    	this.$router.push({path:'/operate/editInfo',query:{type:1,user:user,list:this.list}});
    },
  },
   created() {
      this.getList();
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tab-container {
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
  .btn{
  	margin-left: 30px;
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
  .grid-content{
  	margin-top: 20px;
  	margin-bottom: 20px;
  }
  .txt{
  	font-size:16px;
  	padding-top: 10px;
  	color: #606266;
  	text-align: right;
  }
}
</style>

