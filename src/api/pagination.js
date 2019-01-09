import request from '@/utils/request'
export function logout() {
  return request({
    url: '/api/sys/findSysUserList',
    method: 'get',
    params:data,
  })
}
