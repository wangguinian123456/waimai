<template>
  <div id="app">
    <!-- 展示路由组件 -->
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 底部组件 -->
    <Footer v-if="$route.meta.isshowfooter"></Footer>
  </div>
</template>

<script>
import Footer from "./components/FooterGuide/FooterGuide";

export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  mounted() {
    //分发动作请求
    this.$store.dispatch("getshops");
    //分发动作  获取注册或者登录用户的cookie信息
    this.$store.dispatch("getcookie");
  },
  // data() {
  //   return {
  //     isRouterAlive: true,
  //   };
  // },


  // provide() {
  //   //提供
  //   return {
  //     reload: this.reload, //加载局部刷新的操作
  //   };
  // },
  provide() {
    //提供
    return {
      reload: this.reload, //加载局部刷新的操作
    };
  },

  
 
  
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false;
  //     this.$nextTick(function () {
  //       this.isRouterAlive = true;
  //     });
  //   },
  // },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },


  computed: {
    isShowFooter() {
      return this.$route.path !== "/login";
    },
  },
  // mounted(){
  //   if(this.$route.path==='/login'){
  //     this.isShowFooter=false
  //   }
  // }
};
</script>

<style>
</style>
