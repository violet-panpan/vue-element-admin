<template>
  <div class="tab-container">
		<el-row :gutter="10">
		  <el-col :span="2" style="margin-left: 2.5%;">
		  	<div class="grid-content">
		  		 <el-input v-model="pagination.realName" placeholder="来源"></el-input>
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
		  <el-col :span="0.7">
		  <div class="grid-content">
		  	 <el-button type="primary" @click="fresh" icon='el-icon-refresh' circle></el-button>
		  </div>
		  </el-col>
		  <el-col :span="2">
		  <div class="grid-content">
		  	 <p class="txt">总共数据 ： {{total}}</p>
		  </div>
		  </el-col>
		</el-row>
  	   <el-card class="box-card" style="width: 95%;margin: 0 auto;">
       <el-table
      :data="tableData"
      >
      <el-table-column
      type="selection"
      width="40">
    </el-table-column>
    <el-table-column
      prop="realName"
      label="渠道"
      >
    </el-table-column>
    <el-table-column
      prop="account"
      label="截图人数"
     >
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
import {dataList} from '@/api/operate'
export default{
  name: 'PagePermission',
    data() {
    return {
    	tableData:[],
    	listUrl:'/api/userAdmin/findUserLoanList',
    	listUrl1:'/api/userAdmin/findFeatureInfoByTypeId',
      activeName: 'CN',
      statusList:[{id:1,name:'是'},{id:0,name:'否'},{id:2,name:'全部'}],
      typeList:[],
      createdTimes: 0,
      pagination:{
	      size:10,
	      index:1,
	      status:"",
	      realName:'',
	      city:'',
	      occupation:"",
	      account:'',
	      begin:'',
	      end:'',
      },
      total:0,
    }
  },
  methods: {
add0(m){return m<10?'0'+m:m },
formatTime(row){
    var date =  new Date(row.createTime);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    var h=date.getHours();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+
    d.substring(d.length-2,d.length)+' '+this.add0(h)+':'+this.add0(mi)+':'+this.add0(s);
},
  upformatTime(row){
    var date =  new Date(row.updateTime);
    if(row.updateTime!=null){
    	var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      var h=date.getHours();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+
    d.substring(d.length-2,d.length)+' '+h+':'+mi+':'+s;
    }else{
    	return "暂无更新";
    }
  },
  search(){
   if(this.pagination.status==''){
   	this.pagination.status=2;
   }
   if(this.pagination.occupation==''){
   	this.pagination.occupation=0;
   }
   this.getList();
  },
  fresh(){
  	this.pagination={
	      size:10,
	      index:1,
	      status:"",
	      realName:'',
	      city:'',
	      occupation:"",
	      account:'',
	      begin:'',
	      end:'',
     };
      this.getList();  
  },
    getList() {
    	dataList(this.pagination,this.listUrl).then(response => {
        //this.tableData = response.data.data.items;
        //this.total=response.data.data.total;
     })
		},
		getTypeList() {
    	dataList('',this.listUrl1).then(response => {
        this.typeList = response.data.data;
        var item={id:0,name:'全部'};
        this.typeList.push(item);
     })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.index=val;
      this.getList();
  },
    update(row){
      	this.$router.push({path:'/project/addHot',query:{id:row.id}});
    },
    add(){
    	this.$router.push({path:'/project/addHot'});
    },
  },
   created() {
      this.getList();
      this.getTypeList();
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

