<template>
  <div class="tab-container" style="padding-top: 20px;">
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
        prop="createTime"
        label="创建时间"
        :formatter="formatTime"
        >
      </el-table-column>
       <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter='upformatTime'
        >
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
       >
        <template slot-scope="scope">
            <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否显示">
        <template slot-scope="scope">
        <p v-if="scope.row.status==1">显示</p>
        <p v-if="scope.row.status==0">不显示</p>
      </template>
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
    	itemList:{
    		createTime:'',
    		updateTime:'',
    		status:'',
    		content:'',
    		id:''
    	},
    	listUrl:'/api/noticeAdmin/findNoticeList',
    	delUrl:'/api/noticeAdmin/delNotice',
      activeName: 'CN',
      createdTimes: 0,
      pagination:{
	      pageSize:10,
	      curPage:1,
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
    d.substring(d.length-2,d.length)+' '+this.add0(h)+':'+this.add0(mi)+':'+this.add0(s);
    }else{
    	return "暂无更新";
    }
  },
  setTest(str,styles){
				var string=str;
			var len=0;
			for(let j=0;j<styles.length;j++){
				var mode=styles[j].mode;
		  	var value=styles[j].value;
		  	var length=styles[j].length;
		  	var location=styles[j].location*1;
		  	var subStr=str.substr(location,length);
			  string=this.setStrMarke(string,subStr,mode,value);
		 }
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
			return string;
 },
    getList() {
    	this.tableData=[];
    	var that=this;
    	dataList(this.pagination,this.listUrl).then(response => {
        var test = response.data.data.items;
        for(var i=0;i<test.length;i++){
        	var ss=that.setTest(test[i].content,test[i].style);
          var obj={
          	createTime:test[i].createTime,
          	status:test[i].status,
          	updateTime:test[i].updateTime,
          	id:test[i].id,
          	content:ss
          }
        	this.tableData.push(obj);
        }
        this.total=response.data.data.total;
     })
		},
		handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.curPage=val;
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
      	this.$router.push({path:'/operate/editNotice',query:{id:row.id}});
    },
    add(){
    	this.$router.push({path:'/operate/editNotice'});
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
  	margin-left: 45px;
  	margin-bottom: 15px;
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

