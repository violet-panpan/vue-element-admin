<template>
  <div class="tab-container" style="padding-top: 20px;">
  	   <span style="margin-left: 20px;">【{{marketName}}】迭代版本</span>
  	   <el-button type="primary" class='btn' @click="add">新增</el-button>
  	   <el-card class="box-card" style="width: 95%;margin: 0 auto;">
       <el-table
      :data="tableData"
      >
      <el-table-column
      type="selection"
      width="40">
    </el-table-column>
      <el-table-column
        prop="forcibly"
        label="是否强制更新">
         <template slot-scope="scope">
         	<p v-if="scope.row.forcibly==1">是</p>
         	<p v-if='scope.row.forcibly==0'>否</p>
         </template>
      </el-table-column>
      <el-table-column
        prop="nameVersion"
        label="版本名称">
      </el-table-column>
      <el-table-column
        prop="buildVersion"
        label="构建版本">
      </el-table-column>
      <el-table-column
        prop="releaseNotes"
        label="版本内容">
      </el-table-column>
       <el-table-column
        prop="downloadUrl"
        label="下载网址">
      </el-table-column>
       <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formatTime"
        width="180">
       </el-table-column>
      <el-table-column  label="操作">
      <template slot-scope="scope">
       <el-button @click="del(scope.row)">删除</el-button>
       <el-button @click="update(scope.row)">修改</el-button>
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
      activeName: 'CN',
      createdTimes: 0,
      pagination:{
	      size:10,
	      index:1,
	      appId:'',
      },
      marketName:'',
      total:0,
      listUrl:'/api/appAdmin/findAppVersionList',
    	delUrl:'/api/appAdmin/deleteAppVersion',
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
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
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
      this.$router.push({path:'/operate/addOld',query:{id:row.id,appId:this.pagination.appId,marketName:this.marketName}});
    },
    add(){
    	  this.$router.push({path:'/operate/addOld',query:{appId:this.pagination.appId,marketName:this.marketName}});
    },
  },
   created() {
   	  this.pagination.appId=this.$route.query.id;
   	  this.marketName=this.$route.query.marketName
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
  	margin-top: 8px;
  	margin-left: 30px;
  	margin-bottom: 8px;
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

