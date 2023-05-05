<template>
  <div class="about">
    <div class="logo">
      myq
    </div>
    <div class="pho field">
      <input 
        type="tel"
        maxlength="11"
        placeholder="请输入用户名" 
        v-model="pho" 
        @change="handlePhoneChange" />
    </div>
    <div class="code">
      <div class="codeWrap flex">
        <input type="password" placeholder="请输入验证码" v-model="pwd" />
        <button :disabled="disable" @click="sendCode">{{ codeBtn }}</button>
      </div>
    </div>
    <div class="line1"></div>
    <div class="line2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { showToast } from 'vant';
// import { Field, CellGroup } from 'vant';
let pho = ref('');
let pwd = ref('');
let codeBtn = ref('获取验证码')
let disable = ref(false)
let time1 = ref();

function handlePhoneChange(e: Event) {
  let validateRule = [
    [
      (res: string) => !(res.trim()),
      () =>  showToast('用户名不能为空!')
    ],
    [
      (res: string) => !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(res),
      () =>  showToast('请输入正确的手机号')
    ],
  ]
  let result = (e.target as HTMLInputElement).value;
  const target = validateRule.find(res => res[0](result));
  if (target) {
    target[1](result);
  }
}

// function
function sendCode() {
  let count = 60;
  disable.value = true;
  time1.value = setInterval(() => {
    console.log('===', count)
    if (count === 0) {
      codeBtn.value = '重新获取';
      disable.value = false;
      clearInterval(time1.value);
      return;
    }
    codeBtn.value = count-- + 's';
  }, 1000)
}

onUnmounted(() => {
  clearTimeout(time1.value)
  time1.value=""
})


</script>

<style lang="less">
.about {
  background: #efefef;
  height: 100vh;
  padding: 0 15px;

  .logo {
    padding: 40px
  }
  .pho, .code {
    background-color: #fff;
    height: 40px;
    border-radius: 10px;

    input {
      border: 0;
      height: 100%;
      border-radius: 10px;
      padding-left: 20px;
    }
  }
  .pho {
    margin: 0 0 40px;

    input {
      width: 100%;
    }
  }
  .code {

    .codeWrap {
      width: 100%;
      height: 100%;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 20px;

      button {
        border: 0;
        width: 100px;
        background-color: #fff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  }
  .line1 {
    margin-top: 40px;
    border-top: 1px solid #000;
  }
  .line2 {
    margin-top: 40px;
    position: relative;

    &::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid #000;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      transform-origin: left top
    }
  }
}
</style>
