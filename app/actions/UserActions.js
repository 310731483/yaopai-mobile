import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var UserActions = Reflux.createActions({
  'register' : {children:["success","failed"]},
  'receiveMailRegister' : {children:["success","failed"]},
  'login' : {children:["success","failed"]},
  'loginWithToken' : {children : ['success','failed']},
  'logout' : {children:["success"]},
  'currentServerUser' : {children:['success','failed']},
  'currentUserDetail' : {children:['success','failed']},
  'currentUser' : {children:[]},
  'changeUserNickName' : {children:[]}, // 不是Async，可以不写下面的listen，直接在store里指定
  'changeUserGender' : {children:[]}, // 不是 Async 直接写个空对象就行 @by zaxlct
  'changeUserCity' : {children:[]},
  'changeUserNickNameOnServer' : {children:['success','failed']},
  'changeUserInfoOnServer' : {children:['success','failed']},
  'changeAvatarOnServer' : {children:['success','failed']},
  // 'changeUserCityOnServer' : {children:['success','failed']},

  'modifyPassword':{children:["success","failed"]},
  'verifyTelResetPassWord': {children: ['success', "failed"]},
  'receiveTelResetPassWord': {children: ['success', 'failed']},
})

/*
  https://xiattst.gitbooks.io/yaopai/content/API/User/Login.html

  loginname  string  Y 用户手机或邮箱号码
  password  string  Y 用户密码
  autologin boolean N 是否自动登录
  autoexpires integer N 自动登录过期时间，单位（分钟）
*/
UserActions.login.listen(function(data) {
  //$.post(API.user_api.login_url, data).then(this.success, this.failed);
  HttpFactory.post(API.USER.login,data,this.success,this.failed)
})

/*
  用Token登录
*/
UserActions.loginWithToken.listen(function(data){
  HttpFactory.post(API.USER.login_with_token,data,this.success,this.failed)
})

/*
  得到当前用户
*/
UserActions.currentServerUser.listen(function(data){
  HttpFactory.post(API.USER.current_user,data,this.success,this.failed)
})
/*
  得到当前用户详细信息
*/
UserActions.currentUserDetail.listen(function(){
  var data = {
    Fields : 'Id,NickName,Sex,Avatar,ProvinceName,CityName,CountyName,ProvinceId,CityId,CountyId,Account.Type'
  }
  HttpFactory.post(API.USER.currentUserDetail,data,this.success,this.failed)
})

/*
  修改 当前用户 昵称
*/
UserActions.changeUserNickNameOnServer.listen(function(nickname){
  var data = {
    NickName: nickname
  }
  HttpFactory.post(API.USER.changeInfo,data,this.success,this.failed)
})


/*
  修改 当前用户 性别（必须附上昵称和地区）
*/
UserActions.changeUserInfoOnServer.listen(function(nickname, gender, city){
  var data = {
    NickName: nickname,
    Sex: parseInt(gender),
    Location: parseInt(city)
  }

  HttpFactory.post(API.USER.changeInfo,data,this.success,this.failed)
})

/*
  修改 当前用户 头像
*/
UserActions.changeAvatarOnServer.listen(function(imgLink) {
  var data = {
    Avatar: imgLink
  }
  HttpFactory.post(API.USER.changeAvatar,data,this.success,this.failed)
})


/*
  用户注册
  data:｛tel,code,password｝
  {
      Result: true,    //是否通过验证并注册成功
      ErrorCode: 0,    //错误代码
      ErrorMsg: null    //错误信息
  }
*/
UserActions.register.listen(function(data) {
  // $.post(API.user_api.register_url, data).then(this.success, this.failed);
  HttpFactory.post(API.USER.register,data,this.success,this.failed)
})

// 验证用户邮箱所接收到的验证码
UserActions.receiveMailRegister.listen(function(data) {
  // $.post(API.user_api.register_url, data).then(this.success, this.failed);
  HttpFactory.post(API.USER.receiveMailRegister,data,this.success,this.failed)
})
/*
  修改密码
  ##请求data结构
  | 参数 | 类型 | 必填 |说明 |
  | -- | -- | -- |-- |
  | rawPassword | string | Y |用户原始密码 |
  | newPassword | string | Y |用户新密码 |
  返回值：
  {
    ErrorCode: 0, //错误代码
    ErrorMsg: null  //错误信息
    Success:true    //请求是否成功
  }
*/
UserActions.modifyPassword.listen(function(data){
  HttpFactory.post(API.USER.modify_password,data,this.success,this.failed)
})
/*
  用户登出
*/
UserActions.logout.listen(function(data) {
  HttpFactory.post(API.USER.logout,data,this.success,this.failed)
})

/*用户重置密码验证码的验证*/
UserActions.verifyTelResetPassWord.listen(function (data) {
  HttpFactory.post(API.USER.verifyTelResetPassWord, data, this.success, this.failed)
})

/*用户重置密码的密码提交*/
UserActions.receiveTelResetPassWord.listen(function (data) {
  HttpFactory.post(API.USER.receiveTelResetPassWord, data, this.success, this.failed)
})

export {UserActions as default}
