<template>
  <div class="tab-container">
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
        prop="name"
        label="问题类型">
      </el-table-column>
       <el-table-column
        prop="orders"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        >
        <template slot-scope="scope">
        	<img :src="scope.row.icon" style="width:50px;height:50px;"/>
      </template>
      </el-table-column>
      <el-table-column  label="操作" width="300">
      <template slot-scope="scope">
      <el-button @click="update(scope.row)">修改</el-button>
       <el-button @click="deltail(scope.row)">查看详情</el-button>
       <el-button @click="del(scope.row)">删除</el-button>
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
      },
      total:0,
      listUrl:'/api/qaAdmin/findQaTypeList',
    	delUrl:'/api/qaAdmin/delQaType',
    }
  },
  methods: {
  add0(m){return m<10?'0'+m:m },
  formatTime(row) {
    var date =  new Date(row.createTime);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
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
    d.substring(d.length-2,d.length)+' '+this.add0(h)+':'+this.add0(mi)+':'+this.add0(s);
    }else{
    	return "暂无更新";
    }
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
      this.$router.push({path:'/operate/editQuestion',query:{id:row.id}});
    },
    add(){
    	 this.$router.push({path:'/operate/editQuestion'});
    },
    deltail(row){
    	this.$router.push({path:'/operate/question',query:{typeId:row.id}});
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
  	margin-top: 8px;
  	margin-left: 2.8%;
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

