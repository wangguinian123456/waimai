
//引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'


//使用路由
Vue.use(VueRouter)

// import Msite from '../pages/Msite/Msite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'
//路由懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
import Login from '../pages/Login/Login'
import UserInfo from '../pages/Profile/UserInfo.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import Account from '../pages/Account/Account'
import OrderInfo from '../pages/Order/OrderInfo'





//暴露
const router =  new VueRouter({
    
   routes:[
    {
        path:'/',
        redirect:'/msite'
      },
      {
        path:'/msite',
        component:Msite,
        meta:{
          title:'书店首页',
          isshowfooter:true//显示底部
        }
      },
      {
        path:'/search',
        component:Search,
        meta:{
          title:'搜索页面',
          isshowfooter:true//显示底部
        }
      },
      {
        path:'/order',
        component:Order,
        meta:{
          title:'订单页面',
          isshowfooter:true//显示底部
        },
        children:[
          {
            path:'/orderinfo/:orders_id',
            component:OrderInfo,
            meta:{
              title:'订单详细页面',
              isshowfooter:true//显示底部
            }
          },
        ]
        

      },
      
      {
        path:'/profile',
        component:Profile,
        meta:{
          title:'个人中心',
          isshowfooter:true//显示底部
        }
      },
      {
        path:'/userinfo/:username',
        component:UserInfo,
        meta:{
          title:'个人中心',
          isshowfooter:true//显示底部
        }
      },
      {
        path:'/shop/',
        component:Shop,
        children:[
          {path:'/shop/goods/:id',
          component:ShopGoods,
          meta:{
            title:'买书页面'
            
          }
          },
          {
            path:'/shop/ratings/:id',
          component:ShopRatings,
          meta:{
            title:'评价页面'
          }
          },
          {
            path:'',
            redirect:'/shop/goods'
          },
        ],
        meta:{
          title:'登录页面',
          isshowfooter:false//不去显示底部
        }
        
      },
      {
        path:'/account/:username',
        component:Account,
        meta:{
          isshowfooter:false, 
          title:'结算页面'
        }
      },
      {
        path:'/login',
        component:Login,
        meta:{
          title:'登录页面'
        }
      },
   ]
})


//设置全局后置路由守卫

router.afterEach((to,from)=>{
  document.title=to.meta.title
})







//暴露
export default router