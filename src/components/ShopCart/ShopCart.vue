<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleshow">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight: totalCount }">
              <i
                class="iconfont icon-shopping_cart"
                :class="{ highlight: totalCount }"
              ></i>
            </div>
            <div class="num" v-if="totalCount">{{ totalCount }}</div>
          </div>
          <div class="price highlight">￥{{ totalPrice }}</div>
          <div class="desc">另需邮费￥{{ shopones.fee }} 元</div>
        </div>
        <div class="content-right">
          <!-- 如果样式是enough 可以结算 -->
          <div class="pay" :class="payClass" @click="account">{{payText}}</div>
        </div>
      </div>
      <div class="shopcart-list" v-show="showlist">
        <!-- <div class="shopcart-list"> -->
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(item, index) in cartFoods" :key="index">
              <span class="name">{{ item.foodname }}</span>
              <div class="price">
                <span>￥{{ item.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <!-- <div class="cartcontrol">
                  <div class="iconfont icon-remove_circle_outline"></div>
                  <div class="cart-count">1</div>
                  <div class="iconfont icon-add_circle"></div>
                </div> -->
                <CartControl :food="item"></CartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="showlist" @click="toggleshow"></div>
  </div>
</template>

<script>
 import { MessageBox ,Toast} from 'mint-ui';
// 引入CartControl 组件
import CartControl from "../CartControl/CartControl.vue";
import { mapState, mapGetters } from "vuex";
//引入商家数据接口
import { shopone } from "../../api/index";

// import CartControl from "../CartControl/CartControl.vue";
// import { mapState, mapGetters } from "vuex";
// import { shopone } from "../../api/index";
// //导入弹出式提示框
// import { MessageBox,Toast } from "mint-ui";
export default {
  props: ["shoplistid"],
  computed: {
    ...mapState(["cartFoods",'userInfo']),
    ...mapGetters(["totalCount", "totalPrice"]),
    showlist(){
      if(this.totalCount===0){
        this.isshow=false
        return false
      }
      return this.isshow
    },
    //结算按钮的样式取值
  payClass(){
    //获取总价格
    const {totalPrice}=this
    //获取配送费
    const fee = this.shopones.fee
    return totalPrice>fee? 'enough': 'not-enough'
  },
  //控制结算按钮的文字
  payText(){
    //获取总价格
    const {totalPrice}=this
    //获取配送费
    const fee = this.shopones.fee
    if (totalPrice===0){
      return `￥${fee}元起包邮`
    }else if(totalPrice<fee){
      return `还差￥${fee-totalPrice}元起包邮`
    }else{
      return '结算'
    }
  },
  },
  components: {
    CartControl,
  },
  data() {
    return {
      shopones: "",
      shopCount: "",
      isshow: false,
    };
  },
  
  //调用该商家数据
  async mounted() {
    let id = this.shoplistid;
    let res = await shopone(id);
    // console.log(res);
    this.shopones = res;
  },
  methods: {
    toggleshow() {
      if (this.totalCount > 0) {
        this.isshow = !this.isshow;
      }
    },
    //清空购物车
    clearCart(){
      //引入mint-ui的messages组件
      MessageBox.confirm("确定清除吗?").then(
        (action) => {
          console.log("确定");
          //清除cookis信息
          //分发清除购物车动作
          this.$store.dispatch("clearCarts");
        },
        (action) => {
          console.log("取消");
        }
      );
    },
    //结算函数
    account(){
      //获取总价格
    const {totalPrice}=this
    //获取配送费
    const fee = this.shopones.fee
    if (totalPrice===0){
      // return `￥${fee}元起送`
      Toast (`￥${fee}元邮`)
    }else if(totalPrice<fee){
      // return `还差￥${fee-totalPrice}元起送`
      Toast (`还差￥${fee-totalPrice}元起邮`)
    }else{
      // return '结算'
      //如果userInfo有值跳转到登陆页面
      if(this.userInfo){
        this.$router.push("/account/"+this.userInfo)
      }else{
        this.$router.replace('/login')
      }
      
      // this.$router.replace("/account")
    }
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $green;
        transition: all 0.4s linear;
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translateY(-100%);

    &.move-enter-active, &.move-leave-active {
      transition: transform 0.3s;
    }

    &.move-enter, &.move-leave-to {
      transform: translateY(0);
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
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
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>