<template>
  <div>
    <div class="login">
      <div class="title">宝塔面板·腾讯云专享版</div>
      <Input placeholder="账号" class="account" v-model="account" />
      <Input placeholder="密码" class="pwd" v-model="pwd" />
      <button class="btn" @click="clicklogin">登陆</button>
    </div>
    <div class="pwdLogin">
      <vue-qr :text="txt" :size="200"></vue-qr>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import Input from '../../components/Input.vue'
import { createKey, createQr, checkQr } from '@/api/servers/api'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
// import { Md5 } from 'ts-md5'

let account = ref('13042124202');
let pwd = ref('miao1314');
let key = ref('');
let txt = ref('');

onBeforeMount(async() => {
  const res = await createKey();
  key.value = res.data.unikey;
  const res1 = await createQr(res.data.unikey);
  console.log(res1)
  txt.value = res1.data.qrurl;
})

const timer = setInterval(() => {
  checkQr(key.value).then(res => {
    console.log(res)
    if (res.code === 803) {
      clearInterval(timer);
      localStorage.setItem('myqToken', res.cookie);
    }
    if (res.code === 800) {
      alert('二维码已过期,请重新获取');
      clearInterval(timer);
    }
  })
}, 3000)

function clicklogin() {
  // login({ phone: account.value, pwd: pwd.value }).then(res => {
  //   console.log(res)
  // })
}
</script>
<style lang="less">
@media screen and (max-width: 750px) {
  .login {
    display: grid;
    grid-template: 
      'head head head' 50px
      '. account .'
      '. pwd .'
      '. btn .' 40px
      /10px 1fr 10px;
    grid-row-gap: 30px;

    .title {
      grid-area: head;
      background-color: rgba(0,0,0,.8);
      color: #fff;
      text-align: center;
      font-size: 17px;
      line-height: 50px;
    }

    .account {
      grid-area: account;
    }
    .pwd {
      grid-area: pwd;
    }
    .btn {
      grid-area: btn;
      font-size: 17px;
      background: linear-gradient(#20a53a,#189d32);
      box-shadow: inset 0 1px 2px #30ad42;
      color: #fff;
      text-shadow: #00851a 0 -1px 0;
      border: 1px solid #20a53a;
      border-radius: 3px;
    }
  }
}
</style>