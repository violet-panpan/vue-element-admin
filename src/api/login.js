import request from '@/utils/request'
export function loginByUsername(username, password) {
   const data = {
    username,
    password
}
  return request({
    url:'/api/sysAdmin/login',
    method: 'get',
    params:data,
  })
}

export function logout() {
  return request({
    url: '/api/sysAdmin/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
return request({
    url: '/api/sysAdmin/userInfo',
    method: 'get',
    params: {id:token}
})
}

