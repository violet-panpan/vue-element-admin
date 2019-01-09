<template>
  <div class="tab-container">
       <el-table
      :data="tableData"
      style="width: 95%;margin: 0 auto;">
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
        width="130">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="130">
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
      <el-table-column  label="操作">
      <template slot-scope="scope">
       <el-button @click="del(scope.row)">删除</el-button>
       <el-button @click="update(scope.row)">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
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
import tabPane from './components/tabPane'
import request from '@/utils/request'
export default{
  name: 'PagePermission',
  components: { tabPane},
    data() {
    return {
    	tableData:[],
      activeName: 'CN',
      createdTimes: 0,
      pageSize:10,
      curPage:1,
      total:0,
    }
  },
  methods: {
  formatTime(row) {
    var date =  new Date(row.createTime);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
  },
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    getRoleList() {
		  return request({
		    url: '/api/sys/findSysRoleList',
		    method: 'get',
		    params:{
		    	index:1,
		    	size:10
		    },
		  }).then(response => {
        console.log(response.data.data.items);
        this.tableData=response.data.data.items;
        this.total=response.data.data.total;
       })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.curPage=val;
      this.getRoleList();
   },
    del(row){
    	 return request({
		    url: '/api/sys/delSysUser',
		    method: 'get',
		    params:{
		    	id:row.id
		    },
		    
		  }).then(response => {
//      if(response.data.data.success){
		    	this.$message({
          showClose: true,
          message: '删除成功'
       });
       this.getRoleList();
//     }
       })
    },
    update(row){
      this.$router.push({path:'/role/add',query:{id:row.id}});
    },
  },
   created() {
       this.getRoleList();
  },
}
</script>
