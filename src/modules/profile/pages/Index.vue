<template>
  <div class="container pt-30">
    <div class="profile-wrapper flex-row row-left col-top">
      <ul class="menu-list fs-14">
        <li class="flex-row row-left"
            v-for="item in menuList"
            :class="{ 'active': item.name === $route.name }"
            @click="goPage(item)">
          <i :class="`fa fa-${item.icon}`"></i>
          <span class="pl-10" v-text="item.text"></span>
        </li>
      </ul>
      <div class="flex-1 pl-30">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menuList: [{
          name: 'basic',
          text: '基本信息',
          icon: 'sliders'
        }, {
          name: 'resetPwd',
          text: '重置密码',
          icon: 'cogs'
        }],
      };
    },
    methods: {
      goPage(item) {
        this.$router.push({name: item.name});
      },
    }
  };
</script>

<style lang="scss">
  @import "../../core/styles/color";
  .profile-wrapper{
    .menu-list{
      max-width: 250px;
      min-width: 200px;
      li{
        cursor: pointer;
        padding: 10px 15px;
        &:hover, &.active{
          background-color: $c-light-border;
        }
        &.active{
          color: $c-green;
        }
      }
    }
  }
</style>
