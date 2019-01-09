<template>
  <div class="tab-container">
       <el-table
      :data="tableData"
      style="width: 95%;margin: 0 auto;">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
       <el-table-column
        prop="updateTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
         width="200"
        label="管理员角色">
      </el-table-column>
      <el-table-column min-width="300px" label="操作">
      <template slot-scope="scope">
       <el-button @click="del(scope.row)">删除</el-button>
       <el-button @click="update(scope.row)">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000"
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
      tabMapOptions: [
        { label: 'China', key: 'CN' },
        { label: 'USA', key: 'US' },
        { label: 'Japan', key: 'JP' },
        { label: 'Eurozone', key: 'EU' }
      ],
      activeName: 'CN',
      createdTimes: 0,
      pageSize:10,
      curPage:1,
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    getUserList() {
		  return request({
		    url: '/api/sys/findSysUserList',
		    method: 'get',
		    params:{
		    	index:this.curPage,
		    	size:this.pageSize
		    },
		    
		  }).then(response => {
        console.log(response.data.data.items);
        this.tableData=response.data.data.items;
       })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.curPage=val;
      this.getUserList();
    },
    del(row){
    	 return request({
		    url: '/api/sys/delSysUser',
		    method: 'get',
		    params:{
		    	id:100
		    },
		    
		  }).then(response => {
//      if(response.data.data.success){
		    	this.$message({
          showClose: true,
          message: '删除成功'
       });
       this.getUserList();
//     }
       })
    },
    update(row){
      this.$router.push({path:'/permission/directive',query:{id:row.id}});
    },
  },
   created() {
      this.getUserList();
  },
}
</script>
