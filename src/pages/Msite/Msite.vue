<template>
  <div class="msite">
    <!-- 首页头部 -->
    <HeaderTop :title="title">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <router-link
        to="login"
        class="header_login"
        slot="right"
        v-if="!userInfo"
      >
        <span class="header_login_text">登录|注册</span>
      </router-link>

      <!-- <router-link to="userinfo" class="header_login" slot="right" v-else>
        <span class="header_login_text" v-if="!userInfo">登录|注册</span>
        <span class="header_login_text" v-else>{{userInfo}}</span>
      </router-link> -->

      <a
        class="header_login"
        slot="right"
        v-else
        @click="$router.push(`/userinfo/${userInfo}`)"
      >
        <span class="header_login_text">{{ userInfo }}</span>
      </a>
    </HeaderTop>
    <!-- 首页导航 -->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>外国文学</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>世界名著</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/3.jpg" />
              </div>
              <span>童书绘本</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/4.jpg" />
              </div>
              <span>文学小说</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/5.jpg" />
              </div>
              <span>经济管理</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/6.jpg" />
              </div>
              <span>艺术修养</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/7.jpg" />
              </div>
              <span>政治军事</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/8.jpg" />
              </div>
              <span>学习文具</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>考研用书</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>历史</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/3.jpg" />
              </div>
              <span>哲学</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/4.jpg" />
              </div>
              <span>教材辅助</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/5.jpg" />
              </div>
              <span>科普百科</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/6.jpg" />
              </div>
              <span>益智游戏</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/7.jpg" />
              </div>
              <span>少儿涂色书</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/8.jpg" />
              </div>
              <span>唐诗三百首</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/9.jpg" />
              </div>
              <span>小说名著</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/10.jpg" />
              </div>
              <span>文学随笔</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/11.jpg" />
              </div>
              <span>经济管理</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/12.jpg" />
              </div>
              <span>保健生活</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/13.jpg" />
              </div>
              <span>生活娱乐</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/14.jpg" />
              </div>
              <span>童书育儿</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/1.jpg" />
              </div>
              <span>中国文学</span>
            </a>
            <a href="javascript:" class="link_to_food">
              <div class="food_container">
                <img src="./images/nav/2.jpg" />
              </div>
              <span>中医宝库</span>
            </a>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 前进后退按钮 -->
        <!-- <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div> -->
        <!-- 滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </nav>
    <!-- 首页附近商家 -->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">书店</span>
      </div>
      <ShopList></ShopList>
    </div>
  </div>
</template>
  <script>
import { mapState } from "vuex";
import "swiper/dist/js/swiper";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList";

export default {
  data() {
    return {
      title: "首页",
    };
  },
  components: {
    HeaderTop,
    ShopList,
  },
  mounted() {
    new Swiper(".swiper-container", {
      //direction: 'vertical', // 垂直切换选项
      //mousewheel: true, //滚轮
      autoplay: {
        //自动开始
        delay: 2500, //时间间隔
        disableOnInteraction: false, //*手动操作轮播图后不会暂停*
      },
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // 分页器可以点击
      },

      // 如果需要前进后退按钮
      // navigation: {
      // 	nextEl: '.swiper-button-next',
      // 	prevEl: '.swiper-button-prev',
      // },

      // 如果需要滚动条
      // scrollbar: {
      // 	el: '.swiper-scrollbar',
      // },
    });
  },
  //计算属性
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>
  <style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl';

  .msite { // 首页
    width: 100%;

    .msite_nav {
      bottom-border-1px(#e4e4e4);
      margin-top: 45px;
      height: 200px;
      background: #fff;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-wrapper {
          width: 100%;
          height: 100%;

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;

            .link_to_food {
              width: 25%;

              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;

                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }

              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666;
              }
            }
          }
        }

        .swiper-pagination {
          >span.swiper-pagination-bullet-active {
            background: #02a774;
          }
        }
      }
    }

    .msite_shop_list {
      top-border-1px(#e4e4e4);
      margin-top: 10px;
      background: #fff;

      .shop_header {
        padding: 10px 10px 0;

        .shop_icon {
          margin-left: 5px;
          color: #999;
        }

        .shop_header_title {
          color: #999;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }

  .shop_container { // 商家列表
    margin-bottom: 50px;

    .shop_list {
      .shop_li {
        bottom-border-1px(#f1f1f1);
        width: 100%;

        >a {
          clearFix();
          display: block;
          box-sizing: border-box;
          padding: 15px 8px;
          width: 100%;

          .shop_left {
            float: left;
            box-sizing: border-box;
            width: 23%;
            height: 75px;
            padding-right: 10px;

            .shop_img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          .shop_right {
            float: right;
            width: 77%;

            .shop_detail_header {
              clearFix();
              width: 100%;

              .shop_title {
                float: left;
                width: 200px;
                color: #333;
                font-size: 16px;
                line-height: 16px;
                font-weight: 700;

                &::before {
                  content: '品牌';
                  display: inline-block;
                  font-size: 11px;
                  line-height: 11px;
                  color: #333;
                  background-color: #ffd930;
                  padding: 2px 2px;
                  border-radius: 2px;
                  margin-right: 5px;
                }
              }

              .shop_detail_ul {
                float: right;
                margin-top: 3px;

                .supports {
                  float: left;
                  font-size: 10px;
                  color: #999;
                  border: 1px solid #f1f1f1;
                  padding: 0 2px;
                  border-radius: 2px;
                }
              }
            }

            .shop_rating_order {
              clearFix();
              width: 100%;
              margin-top: 18px;
              margin-bottom: 8px;

              .shop_rating_order_left {
                float: left;
                color: #ff9a0d;

                .star { // 2x图 3x图
                  float: left;
                  font-size: 0;

                  .star-item {
                    display: inline-block;
                    background-repeat: no-repeat;
                  }

                  &.star-48 {
                    .star-item {
                      width: 20px;
                      height: 20px;
                      margin-right: 22px;
                      background-size: 20px 20px;

                      &:last-child {
                        margin-right: 0;
                      }

                      &.on {
                        bg-image('./images/stars/star48_on');
                      }

                      &.half {
                        bg-image('./images/stars/star48_half');
                      }

                      &.off {
                        bg-image('./images/stars/star48_off');
                      }
                    }
                  }

                  &.star-36 {
                    .star-item {
                      width: 15px;
                      height: 15px;
                      margin-right: 6px;
                      background-size: 15px 15px;

                      &:last-child {
                        margin-right: 0;
                      }

                      &.on {
                        bg-image('./images/stars/star36_on');
                      }

                      &.half {
                        bg-image('./images/stars/star36_half');
                      }

                      &.off {
                        bg-image('./images/stars/star36_off');
                      }
                    }
                  }

                  &.star-24 {
                    .star-item {
                      width: 10px;
                      height: 10px;
                      margin-right: 3px;
                      background-size: 10px 10px;

                      &:last-child {
                        margin-right: 0;
                      }

                      &.on {
                        bg-image('./images/stars/star24_on');
                      }

                      &.half {
                        bg-image('./images/stars/star24_half');
                      }

                      &.off {
                        bg-image('./images/stars/star24_off');
                      }
                    }
                  }
                }

                .rating_section {
                  float: left;
                  font-size: 10px;
                  color: #ff6000;
                  margin-left: 4px;
                }

                .order_section {
                  float: left;
                  font-size: 10px;
                  color: #666;
                  transform: scale(0.8);
                }
              }

              .shop_rating_order_right {
                float: right;
                font-size: 0;

                .delivery_style {
                  transform-origin: 35px 0;
                  transform: scale(0.7);
                  display: inline-block;
                  font-size: 12px;
                  padding: 1px;
                  border-radius: 2px;
                }

                .delivery_left {
                  color: #fff;
                  margin-right: -10px;
                  background-color: #02a774;
                  border: 1px solid #02a774;
                }

                .delivery_right {
                  color: #02a774;
                  border: 1px solid #02a774;
                }
              }
            }

            .shop_distance {
              clearFix();
              width: 100%;
              font-size: 12px;

              .shop_delivery_msg {
                float: left;
                transform-origin: 0;
                transform: scale(0.9);
                color: #666;
              }

              .segmentation {
                color: #ccc;
              }
            }
          }
        }
      }
    }
  }
</style>