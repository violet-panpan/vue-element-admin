<template>
  <div class="tab-container">
		<el-row :gutter="10">
		  <el-col :span="3" style="margin-left: 43px;">
		  	<div class="grid-content">
		  		 <el-input v-model="pagination.name" placeholder="贷款名称"></el-input>
		  	</div>
		  </el-col>
		  <el-col :span="3">
		  	<div class="grid-content">
		  	<el-select v-model="pagination.status" placeholder="是否上架">
		    <el-option
		      v-for="item in statusList"
		      :key="item.id"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
        </el-select>
		    </div>
		  </el-col>
		  <el-col :span="0.7" style="margin-left: 10px;">
			  <div class="grid-content">
			  	<el-button icon="el-icon-search" circle @click="search" type="primary"></el-button>
			  </div>
		  </el-col>
		   <el-col :span="1">
		  <div class="grid-content">
		  	 <el-button type="primary" @click="fresh" icon='el-icon-refresh' circle></el-button>
		  </div>
		  </el-col>
		    <el-col :span="2">
		  	<div class="grid-content">
		  		<el-button type="primary" class='btn' @click="add">新增</el-button>
		  	</div>
		  </el-col>
		  <el-col :span="10">
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
      prop="name"
      label="名称"
      >
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formatTime"
        width="180">
      </el-table-column>
       <el-table-column
        prop="amount"
        label="借款金额范围"
        >
      </el-table-column>
      </el-table-column>
       <el-table-column
        prop="term"
        label="借款期限范围"
        >
      </el-table-column>
      <el-table-column
      prop="rate"
      label="借款利率"
      >
      <template slot-scope="scope">
      	<p>{{scope.row.rateUnit}}利率{{scope.row.rate}}</p>
      </template>
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="是否上架"
       >
      </el-table-column>
      <el-table-column
        prop="homeSort"
        label="首页排序">
      </el-table-column>
       <el-table-column
        prop="listSort"
        label="贷款中心排序">
      </el-table-column>
      <el-table-column  label="操作" width="180">
      <template slot-scope="scope">
       <el-button @click.stop.prevent="del(scope.row)">删除</el-button>
       <el-button @click.stop.prevent="update(scope.row)">修改</el-button>
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
    	listUrl:'/api/loanProductAdmin/findLoanProdList',
    	delUrl:'/api/loanProductAdmin/delLoanProd',
      activeName: 'CN',
      statusList:[{id:1,name:'上架'},{id:0,name:'下架'},{id:2,name:'全部'},],
      createdTimes: 0,
      pagination:{
	      size:10,
	      index:1,
	      status:2,
	      name:'',
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
   this.getList();
  },
  fresh(){
  	this.pagination={
	      size:10,
	      index:1,
	      status:2,
	      name:'',
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
   del(row){
    	delData(row.id,this.delUrl).then(response => {
      if(response.data.statusCode==200){
		    	this.$message({
          showClose: true,
          message: '删除成功'
       });
        this.getList();
       }else{
       		this.$message({
          showClose: true,
          message:response.data.message
       });
       }
     })
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

