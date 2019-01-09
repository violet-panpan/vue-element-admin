<template>
  <div class="tab-container">
  	<el-button type="primary" class="btn" @click="add">新增</el-button>
   <el-card class="box-card"  style="width: 95%;margin: 0 auto;">
   <el-table
      :data="tableData"
     >
      <el-table-column
      type="selection"
      width="40">
    </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formatTime"
        width="180">
      </el-table-column>
       <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter="formatTime"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="150">
      </el-table-column>
      <el-table-column
        prop="roleName"
         width="180"
        label="账号类型">
      </el-table-column>
      <el-table-column
        prop="statusName"
         width="180"
        label="状态">
      </el-table-column>
      <el-table-column  label="操作" width="180">
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
      },
      total:0,
      listUrl:'/api/sysAdmin/findSysUserList',
      delUrl:'/api/sysAdmin/delSysUser'
    }
  },
  methods: {
  add0(m){return m<10?'0'+m:m },
  formatTime(row) {
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
  upformatTime(row) {
     var date =  new Date(row.updateTime);
    if(row.updateTime!=null){
    	var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
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
    getUserList() {
    	dataList(this.pagination,this.listUrl).then(response => {
        this.tableData = response.data.data.items;
        this.total=response.data.data.total;
     })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.index=val;
      this.getUserList();
    },
    fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
   },
   del(row){
   delData(row.id,this.delUrl).then(response => {
      if(response.data.statusCode==200){
		    	this.$message({
          showClose: true,
          message: '删除成功'
       });
        this.getUserList();
       }else{
       		this.$message({
          showClose: true,
          message:response.data.message
       });
       }
     })
    },
    update(row){
      this.$router.push({path:'/system/addUser',query:{id:row.id}});
    },
    add(){
    	this.$router.push({path:'/system/addUser'});
    },
  },
   created() {
      this.getUserList();
  },
}
</script>
<style scoped>
.btn{
	margin-left:40px;
	margin-bottom: 12px;
	margin-top: 12px;
}
</style>

