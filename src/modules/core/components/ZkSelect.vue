<template>
  <div class="zk-select" :style="{ width: width }">
    <div class="form-group" :class="{'error': error}">
      <label class="form-label" v-if="label">{{label}} <sup v-if="sup">{{sup}}</sup></label>
      <div class="has-icon" @click.stop="changeShow">
        <input type="text" class="form-control" v-model="selectLabel" readonly="readonly" :placeholder="placeholder" autocomplete="off"/>
        <i class="fa fa-chevron-down right-input-icon drapdown text-gray" :class="{'active': showOptions}"></i>
      </div>
      <p class="tip" v-text="errorTip"></p>
    </div>
    <transition name="dropdown">
      <div class="zk-select-dropdown" v-show="showOptions">
        <div class="zk-options-wrapper">
          <ul class="zk-options fs-14 text-eps">
            <li
              v-for="item in options"
              :key="item.value"
              :class="{'active': item.value === value}"
              @click.stop="selectItem(item)">
              {{item.label}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'ZkSelect',
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      sup: {
        type: String,
      },
      label: {
        type: String,
      },
      error: {
        type: Boolean,
      },
      errorTip: {
        type: String
      },
      options: {
        type: Array,
        required: true,
      },
      width: {
        type: String,
        default: '240px'
      },
      value: {
        required: true,
      }
    },
    data() {
      return {
        showOptions: false,
      };
    },
    computed: {
      selectLabel() {
        const opts = this.options;
        const selectedVal = this.value;
        for (let i = 0, l = opts.length, opt; i < l; i++) {
          opt = opts[i];
          if (selectedVal === opt.value) {
            return opt.label;
          }
        }
      }
    },
    mounted() {
      window.addEventListener('click', this.hideOptions, false);
    },
    methods: {
      changeShow() {
        this.showOptions = !this.showOptions;
      },
      selectItem(item) {
        this.hideOptions();
        this.$emit('input', item.value);
      },
      hideOptions() {
        this.showOptions = false;
      }
    },
    destroyed() {
      window.removeEventListener('click', this.hideOptions, false);
    }
  };
</script>
<style lang="scss">
  @import "../styles/color";
  .zk-select{
    position: relative;
  }
  .zk-select-dropdown{
    max-height: 247px;
    overflow: hidden;
    min-width: calc(100% + 20px);
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2;
    background-color: transparent;
    padding:  0 10px;
    margin-left: -10px;
    &:before, &:after{
      content: '';
      width:0;
      height:0;
      border-top:6px solid transparent;
      border-right:6px solid transparent;
      border-left:6px solid transparent;
      position: absolute;
      left: 50%;
      margin-left: -6px;
    }
    &:before{
      border-bottom:6px solid $c-border;
      top: -1px;
      filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
    }
    &:after{
      border-bottom:6px solid $c-white;
      top: 0;
    }
  }
  .zk-options-wrapper{
    overflow: hidden;
    border: 1px solid $c-border;
    border-radius: 4px;
    background-color: $c-white;
    box-shadow: 0 2px 12px 0 rgba($c-black,.2);
    margin: 10px 0;
  }
  .zk-options{
    height: 100%;
    overflow: scroll;
    margin-bottom: -17px;
    margin-right: -17px;
    padding: 8px 0;
    color: $c-text;
    & > li{
      padding: 0 20px;
      position: relative;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
      &:hover{
        background-color: $c-light-gray;
        color: $c-green;
      }
    }
  }
  // 动画过渡
  .dropdown-enter-active, .dropdown-leave-active {
    transition: all 0.3s;
    transform-origin: center top;
  }
  .dropdown-enter, .dropdown-leave-to {
    max-height: 0;
  }
</style>
