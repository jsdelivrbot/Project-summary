import request from '@/utils/request'

export function login(username, password,Captcha,sessionId) {
  return request({
    url: '/api/user/Login',
    method: 'post',
    data: {
      UserCode:username,
      L1pwd:password,
      Captcha:Captcha,
      sessionId:sessionId
    }
  })
}

export function getInfo(userId, token) {
 console.log(userId,token);
  return request({
    url: '/api/user/getuserinfo',
    method: 'post',
    data:{
      userId :userId,
      token:token
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
