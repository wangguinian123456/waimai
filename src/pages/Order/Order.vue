<template>
  <section class="order">
    <HeaderTop :title="title" />
    <section class="order_no_login" v-if="!userInfo">
      <img src="./images/order/person.jpg" />
      <h3>登录后查看书籍订单</h3>
      <button @click="login">立即登陆</button>
    </section>
    <div v-else>
      <div style="width: 100%; height: 50px"></div>
      <h4>您当前的订单为:</h4>
      <div class="container" style="border: 3px;border-style:dashed; border-color:green ;">
        <table class="table table-hover">
          <tr>
            <th>订单号</th>
            <th>总价格</th>
            <th>购买人</th>
            <th>操作</th>
          </tr>
          <h2 v-show="false">{{ orders }}</h2>
          <tr v-for="(item, index) in orderss" :key="index">
            <td style="color: red;">{{ item.order_num }}</td>
            <td>{{ item.food_totalprice }}</td>
            <td>{{ item.username }}</td>
            <td>
              <router-link 
                :to="`/orderinfo/` + item.id"
                class="btn btn-success"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                查看详情
              </router-link>
            </td>
          </tr>
        </table>
        <!-- 显示订单详情 -->
        <router-view></router-view>
      </div>
      <div style="margin-top: 30px;">
        <img style="width: 100%;" src="./images/order/person.jpg" />
      </div>
    </div>
  </section>
</template>
<script>         

import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
//导入获取会员全部订单信息的方法 getuserorder
import { getuserorder } from "../../api/index";

export default {
  data() {
    return {
      title: "订单页",
      orderss: [], //会员订单信息
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    //计算属性获取订单信息
    orders: async function () {
      let res = await getuserorder(this.userInfo);
      // console.log(res)
      this.orderss = res;
    },
  },
  components: {
    HeaderTop,
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">


.order { // 订单
  width: 100%;

  .order_no_login {
    padding-top: 140px;
    width: 60%;
    margin: 0 auto;
    text-align: center;

    >img {
      display: block;
      width: 100%;
      height: 30%;
    }

    >h3 {
      padding: 10px 0;
      font-size: 17px;
      color: #6a6a6a;
    }

    >button {
      display: inline-block;
      background: #02a774;
      font-size: 14px;
      color: #fff;
      border: 0;
      outline: none;
      border-radius: 5px;
      padding: 10px 20px;
    }
  }
}
</style>


<!-- <template>
  <div>
    <section class="order">
      <HeaderTop :title='title'></HeaderTop>
      <section class="order_no_login" v-if="!userInfo">
        <img src="./images/order/person.png" />
        <h3>登录后查看外卖订单</h3>
        <button @click="login">立即登陆</button>
      </section>
      <div v-else style=" margin-top:50px">
      <div style="width: 100%; height: 50px">
      <h4>您当前的订单为:</h4>
      <div class="container">
        <table class="table table-hover">
          <tr>
            <th>订单号</th>
            <th>总价格</th>
            <th>购买人</th>
            <th>操作</th>
          </tr>
        </table>
      </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
  import "../../../static/css/bs/js/jquery.min.js";
import "../../../static/css/bs/js/bootstrap.min.js";
import "../../../static/css/bs/js/holder.min.js";
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
export default {
  data() {
    return {
      title: "订单页面",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  components: {
    HeaderTop,
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
  
  <style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl';
  .header { // 头部
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;
    }
  }

  &.order { // 订单
    width: 100%;

    .order_no_login {
      padding-top: 140px;
      width: 60%;
      margin: 0 auto;
      text-align: center;

      >img {
        display: block;
        width: 100%;
        height: 30%;
      }

      >h3 {
        padding: 10px 0;
        font-size: 17px;
        color: #6a6a6a;
      }

      >button {
        display: inline-block;
        background: #02a774;
        font-size: 14px;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 5px;
        padding: 10px 20px;
      }
    }
  }
</style> -->