import request from '@/utils/request'
//获取数据列表
export function dataList(query,url) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}
//删除
export function delData(query,url) {
  return request({
    url: url,
    method: 'get',
     params:{
		  id:query
		 },
  })
}
//获取详情
export function detailData(query,url) {
  return request({
    url: url,
    method: 'get',
     params:{
		  id:query
		 },
  })
}
export function detailData2(url) {
  return request({
    url: url,
    method: 'get',
  })
}
export function detailData1(query,appId,url) {
  return request({
    url: url,
    method: 'get',
     params:{
		  id:query,
		  appId:appId
		 },
  })
}
//增加/更新
export function addData(param,url,id) {
  return request({
    url: url,
    method: 'post',
    data:param
  })
}
export function addUser(param,url,token) {
	if(token!=null){
		param.token=token;
  }else{
  	param.token=' ';
  }
  return request({
    url: url,
    method: 'post',
    data:param
  })
}


