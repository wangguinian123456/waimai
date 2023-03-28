<template>
  <div>
    <HeaderTop :title="title">
      <nav class="shop-nav" slot="left">
        <a href="javascript:void(0)" class="back" @click="$router.back()">
          <i class="iconfont icon-arrow_left"></i>
        </a>
      </nav>
    </HeaderTop>
    <div style="width: 100%; height: 50px"></div>
    <div class="container">
      <button
        class="btn btn-success"
        data-toggle="modal"
        data-target="#myModal"
      >
        添加收货地址
      </button>
      <form @submit.prevent="addaddress" method="post">
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 class="modal-title">添加收货地址</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>姓名</label>
                  <!-- form-control  使元素宽度变为100%-->
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="请输入姓名"
                    v-model="name"
                  />
                </div>
                <div class="form-group">
                  <label>电话</label>
                  <input
                    type="text"
                    class="form-control"
                    name="phone"
                    placeholder="请输入电话"
                    v-model="phone"
                  />
                </div>
                <div class="form-group">
                  <label>配送地址</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    placeholder="请输入配送地址"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-danger"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  取消
                </button>
                <button class="btn btn-success">添加</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <h4>配送地址</h4>
    <div>
      <ul>
        <li style="width: 100%; height: 30px" v-for="(item,index) in alladdress" :key="index">
          <input type="radio" v-model="address_id" :value="item.id"/>{{item.realname}},{{item.phone}},{{item.address}}
        </li>
      </ul>
    </div>
    <h4>所购书籍</h4>
    <div class="list-content">
      <ul>
        <li class="food" v-for="(item,index) in cartFoods" :key="index">
          <span class="name">{{item.foodname}}</span>
          <div class="price">
            <span>￥{{item.price}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl :food="item"/>
          </div>
        </li>
      </ul>
    </div>
    <div>
    <a href="javascript:void(0)">总计:{{totalPrice}}元</a>
      <button type="button" class="btn btn-success" style="float: right" @click="order">
        {{orderText}}
      </button>
    </div>
  </div>
</template>
<script>

import { insertaddress,getalladdress } from "../../api/index";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { mapState ,mapGetters} from "vuex";
import CartControl from '../../components/CartControl/CartControl.vue'
import {Toast} from 'mint-ui'
import {insertorder,insertordergoods} from '../../api/index'

// import  {insertaddress,getalladdress} from '../../api/index'
// import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
// import {mapState,mapGetters} from 'vuex'
// import CartControl from '../../components/CartControl/CartControl.vue'
// import {Toast} from 'mint-ui'
// import {insertorder,insertordergoods} from '../../api/index'

export default {
  components: {
    HeaderTop,
    CartControl
  },
  inject:['reload'],
  data() {
    return {
      title: "结算页面",
      name: "",
      phone: "",
      address: "",
      alladdress:'',//当前收获地址为空
      address_id:''//选择的收获地址id
    };
  },
  inject: ['reload'], //注入
  methods: {
     async addaddress() {
      let name = this.name;
      let phone = this.phone;
      let address = this.address;
      let username = this.$route.params.username;
      let res =  await insertaddress(name, phone, address, username);
      if(res.msg==='ok'){
        this.reload();//局部无刷新操作
        $('#myModal').modal('hide')
        
      }
    },
    //order提交订单的方法
    async order(){
      //获取总价格
      const {totalPrice}=this;
      //获取收获地址id
      const addressid=this.address_id;
      if(totalPrice===0){
        Toast(`请购书`) 
      }else if(!addressid){
        Toast (`请选择收获地址`)
      }else{
        
        let order_num= Math.floor(Math.random()*10000)
        //选择地址的id
        let address_id = this.address_id
        //总价格
        let food_totalprice = this.totalPrice
        //登录会员的名字
        let username = this.$route.params.username
        
        let res = await insertorder(
          order_num,
          address_id,
          food_totalprice,
          username
        );
        //生成订单详情页面
        if (res.msg === "ok") {
          //订单id
          let orders_id = res.insertid;
          //把购物车数据遍历
          this.cartFoods.forEach(async (item, index) => {
            //所购的食品的名字
            let foodname = item.foodname;
            //食品图片
            let pic = item.foodpic;
            //食品数量
            let count = item.count;
            let res = await insertordergoods(foodname, pic, count, orders_id);
          });
        }
        //跳转到订单页面
        this.$router.push('/order')
        //清除购物车数据
        
        this.$store.dispatch("clearCarts");
      }
    
    }
  },
  // 挂载完毕的钩子函数
  async mounted(){
    let username=this.$route.params.username;
    let res = await getalladdress(username)
      // console.log(res);
      this.alladdress=res;
    

  },
  //计算按属性  
  computed:{
    ...mapState(['cartFoods']),
    ...mapGetters(['totalPrice']),
    orderText(){
      //获取总价格
      const {totalPrice}=this;
      //获取收获地址id
      const addressid=this.address_id;
      if(totalPrice===0){
        return `请选择书籍`
      }else if(!addressid){
        return `请选择收获地址`
      }else{
        return `提交订单`
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

@import '../../common/stylus/mixins.styl';

.shop-nav {
  background-size: cover;
  background-repeat: no-repeat;
  height: 50px;
  padding: 5px 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #02A774;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 0;

    .icon-arrow_left {
      display: block;
      padding: 5px;
      font-size: 20px;
      color: #fff;
    }
  }
}

.list-content {
  padding: 0 18px;
  max-height: 217px;
  overflow: hidden;
  background: #fff;

  .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    bottom-border-1px(rgba(7, 17, 27, 0.1));

    .name {
      line-height: 24px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }

    .price {
      position: absolute;
      right: 90px;
      bottom: 12px;
      line-height: 24px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(240, 20, 20);
    }

    .cartcontrol-wrapper {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}
</style>