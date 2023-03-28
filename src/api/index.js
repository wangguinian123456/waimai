//封装一些方法，调用后端接口
//导入调用后端接口的ajax
import ajax from './ajax'
//获取商家列表
const URLS="/api";
export const getShoplists = () => ajax(`${URLS}/admin/shoplists`,'GET')
// 封装会员注册的方法
export let doregister=(name,pass)=>ajax(`${URLS}/admin/registeruser`,{name,pass},'GET')
//封装会员登陆的方法
export let dologin=(name,pass)=>ajax(`${URLS}/admin/loginuser`,{name,pass},'POST')
//封装获取注册或登录的cookie的信息
export const getcookieuser = () => ajax(`${URLS}/admin/userinfos`,'GET')
//封装注册登录退出的方法
export const userlogout = () => ajax(`${URLS}/admin/vuelogout`,'GET')
//封装商家详细页面的方法
export const shopone = (id) => ajax(`${URLS}/admin/shoplistone`,{id},'GET')
//封装商家单页面详细信息
export const getshopgoods = (id) => ajax(`${URLS}/admin/vueshopgoods`,{id},'GET')
//封装单个商家下的所有评价信息的方法
export const getcoments = (id) => ajax(`${URLS}/admin/vuecomments`,{id},'GET')
//封装下收获地址的方法的方法
export let insertaddress=(name,phone,address,username)=>ajax(`${URLS}/admin/addaddress`,{name,phone,address,username},'POST')
//封装获取当前会员的收获地址
export let getalladdress = (username) => ajax(`${URLS}/admin/usersaddress`,{username},'GET')
//封装生成订单的野页面
export let insertorder=(order_num,food_totalprice,address_id,username)=>ajax(`${URLS}/admin/addorder`,{order_num,food_totalprice,address_id,username},'POST')
//封装生成订单详情页面的方法
// export let insertordergoods=(foodname,price,count,orders_id)=>ajax(`${URLS}/admin/addordergoods`,{foodname,price,count,orders_id},'POST')
export let insertordergoods=(foodname,pic,count,orders_id)=>ajax(`${URLS}/admin/addordergoods`,{foodname,pic,count,orders_id},'POST')
//封装获取当前登录会员的订单信息
export let getuserorder=(username)=>ajax(`${URLS}/admin/userorders`,{username},'GET')
//封装获取当前订单下的订单详情数据
export let getorderinfo=(orders_id)=>ajax(`${URLS}/admin/orderinfos`,{orders_id},'GET')
//封装获取会员详情数据的方法
export let getusermessage=(name)=>ajax(`${URLS}/admin/usermessage`,{name},'GET')
//封装插入会员详情信息的方法
export let insertusermessage=(username,phone,email,userinfo_name)=>ajax(`${URLS}/admin/insertuserinfo`,{username,phone,email,userinfo_name},'POST')
//封装修改会员详情信息的方法
export let updateusermessage=(username,phone,email,userinfo_name)=>ajax(`${URLS}/admin/updateuserinfo`,{username,phone,email,userinfo_name},'POST')
//封装修改会员头像的方法
export let updateuserpic=(headerpic,userinfo_name)=>ajax(`${URLS}/admin/updateuserpic`,{headerpic,userinfo_name},'POST')
//通过关键字搜索商家接口
export let searchshop=(keyword)=>ajax(`${URLS}/admin/searchshop`,{keyword},'POST')
//关键字关键字搜索书籍接口
export let searchfood=(keyword)=>ajax(`${URLS}/admin/searchfood`,{keyword},'POST')
//封装搜索你书籍的接口
export let searchfoods=(foodname)=>ajax(`${URLS}/admin/searchfoods`,{foodname},'POST')
