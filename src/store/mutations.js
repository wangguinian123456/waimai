
//导入vue
import Vue from 'vue'
//直接更新状态数据的模块
import { GETSHOPS, GETUSERNAME, GETCOOKIE, LOGOUTS, UPDATEFOODCOUNTADD, UPDATEFOODCOUNTJIAN ,CLEARCARTS} from './mutation-types'
//注意mutations 模块接收动作一定是动作映射类型
export default {
    //直接添加数据
    //接收的参数是对象格式
    [GETSHOPS](state, { shoplists }) {
        // console.log("这是直接更新数据行为的mutations")
        // console.log(o)
        state.shoplists = shoplists
    },
    [GETUSERNAME](state, { name }) {
        // console.log(name);
        state.userInfo = name;
    },
    //直接把cookie信息赋值给state中的userinfo
    [GETCOOKIE](state, { usernames }) {
        state.userInfo = usernames
    },
    //清空一下之前的state中的userinfo
    [LOGOUTS](state) {
        state.userInfo = ''
    },


    //实现点餐界面的加
    [UPDATEFOODCOUNTADD](state, {food}) {
        if (!food.count) {
            Vue.set(food, 'count', 1)
            //把所购的食品的数据加入到购物车
            state.cartFoods.push(food)
        }
        else {
            food.count++
        }
    },
    [UPDATEFOODCOUNTJIAN](state, { food }) {
        if (food.count) {
            food.count--  
            if(food.count===0){
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },
    //直接清空购物车数据
    [CLEARCARTS](state){
        //清空cartControl中的数量count  count赋值为零
        state.cartFoods.forEach(food => food.count=0)
        //清空购物车数据
        state.cartFoods=[]
    }
}





