//计算属性
export default{
    //计算总数量

    totalCount (state){
        return state.cartFoods.reduce((preTotal,food)=>preTotal+food.count,0)
        // preTotal 起始总数量
        //0初始化的数量
        
        
    },
    //计算总价格
    totalPrice(state){
        //reduce 累计器  累计方法
       // cartFoods购物车的数据
       //preTotal 起始总价格
       //food 所购的食品
       //0 初始化的总价格
       //返回最新的计算的总价格
       return state.cartFoods.reduce((preTotal,food)=>preTotal+food.price*food.count,0)
   }
}