<template>
  <div class="tab-container">
  	<el-button type="primary" class="btn" @click="add">新增</el-button>
   <el-card class="box-card" style="width: 95%;margin: 0 auto;">
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
        :formatter="upformatTime"
        width="180">
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="头像"
        width="150">
        <template slot-scope="scope">
        	<img :src="scope.row.avatar" style="width:50px;height:50px;"/>
      </template>
      </el-table-column>
      <el-table-column
        prop="roleName"
         width="180"
        label="管理员角色">
      </el-table-column>
       <el-table-column
        prop="introduction"
         width="180"
        label="简介">
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
//import formatTime from '@/utils/operate'
import {dataList,delData} from '@/api/operate'
export default{
  name: 'PagePermission',
    data() {
    return {
    	tableData:[],
      activeName: 'CN',
        pagination:{
	      size:10,
	      index:1,
      },
      total:0,
      listUrl:'/api/sysAdmin/findSysRoleList',
      delUrl:'/api/sysAdmin/delSysRole'
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
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    getRoleList() {
		dataList(this.pagination,this.listUrl).then(response => {
        this.tableData = response.data.data.items;
        this.total=response.data.data.total;
     })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.index=val;
      this.getRoleList();
   },
    del(row){
    delData(row.id,this.delUrl).then(response => {
      if(response.data.statusCode==200){
		    	this.$message({
          showClose: true,
          message: '删除成功'
       });
        this.getRoleList();
       }else{
       		this.$message({
          showClose: true,
          message:response.data.message
       });
       }
     })
    },
    update(row){
      this.$router.push({path:'/system/addRole',query:{id:row.id}});
    },
    add(){
    	this.$router.push({path:'/system/addRole'});
    },
  },
   created() {
       this.getRoleList();
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
