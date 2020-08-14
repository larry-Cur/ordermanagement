import axios from 'axios'

//请求基本路径
const IP = 'http://127.0.0.1:5000'

axios.defaults.baseURL = IP

export const ITEMS_IMG_UPLOAD = IP +'/goods/goods_img_upload'

export const ITEMS_IMG_URL = IP +'/upload/imgs/goods_img/'

export const SHOP_IMG_UPLOAD = IP +'/shop/upload'

export const SHOP_IMG_URL = IP +'/upload/shop/'
// 登录API

// account 账号
// password 密码

//es5
// export function login(account,password) {
//     return axios.post('/users/checkLogin', {
//         account,password
//     })
// }

// export default 只能暴露一个内容 接： import xxx from 'xxx
// export xxx 多次暴露 import {xxx1,xxx2} from 'xxx

// 登录
export var login = (account,password)=>axios.post('/users/checkLogin',{account,password})

//获取个人信息(获取头像)
export var accinfo = (id) => axios.get('/users/accountinfo', {params: {id}})

//验证token
export var checktoken = (token)=>axios.get('/users/checktoken',{params:{token}})

//------------------------------------------------账号----------------------------------------------//
// 添加账号
export var adduser = (account,password,userGroup)=>axios.post('/users/add',{account,password,userGroup})

//获取账号列表
export var userlist = (currentPage,pageSize)=>axios.get('/users/list',{params:{currentPage,pageSize}})

//删除账号
export var  deluser =(id)=>axios.get('/users/del',{params:{id}})

//批量删除
export var  delbatches =(ids)=>axios.get('/users/batchdel',{params:{ids}})

// 修改账号
export var changeuser = (id,account,userGroup)=>axios.post('/users/edit',{id,account,userGroup})

// 修改密码
export var changepwd = (newPwd,id)=>axios.post('/users/editpwd',{newPwd,id})

// 检测原密码
export var checkpwd = (oldPwd,id)=>axios.get('/users/checkoldpwd',{params:{oldPwd,id}})

// 获取账号
export var takeuser = (id)=>axios.get('/users/accountinfo',{params:{id}})

//------------------------------------------------商品----------------------------------------------//

//商品列表
export var goodlist = (currentPage,pageSize)=>axios.get('/goods/list',{params:{currentPage,pageSize}})

//删除商品
export var  delgood =(id)=>axios.get('/goods/del',{params:{id}})

//修改商品
export var changegood = (params)=>axios.post('/goods/edit',params)

// 添加商品
export var addgood = (name,category,price,imgUrl,goodsDesc)=>axios.post('/goods/add',{name,category,price,imgUrl,goodsDesc})

//------------------------------------------------商品分类----------------------------------------------//

//获取分类
export var catelist = (currentPage,pageSize)=>axios.get('/goods/catelist',{params:{currentPage,pageSize}})

//查询分类
export var takecate = ()=>axios.get('/goods/categories',{params:{}})

//添加分类
export var addcate = (cateName,state)=>axios.post('/goods/addcate',{cateName,state})

// 删除分类
export var delcate = (id)=>axios.get('/goods/delcate',{params:{id}})

//修改分类
export var editcate = (obj)=>axios.post('/goods/editcate',obj)





//------------------------------------------------订单管理----------------------------------------------//
//获取订单列表
export var orderlist = (params)=>axios.get('/order/list',{ params })

//获取订单详情
export var orderdetail = (id)=>axios.get('/order/detail',{params:{id}})

//修改订单
export var orderedit = (id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState)=>axios.post('/order/edit',{id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState})


//------------------------------------------------店铺管理----------------------------------------------//
//获取店铺详情
export var shopinfo = ()=>axios.get('/shop/info',{params:{}})

//修改店铺
export var shopedit = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics)=>axios.post('/shop/edit',{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})

//------------------------------------------------报表统计----------------------------------------------//

//报表接口
export var totaldata = ()=>axios.get('/order/totaldata')

//订单报表
export var ordertotal = (date)=>axios.get('/order/ordertotal',{params:{date}})


