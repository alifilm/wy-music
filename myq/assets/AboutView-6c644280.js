import{l as D,d as T,m as w,p as j,q as M,g as m,s as N,t as q,x as C,y as b,z as A,A as O,I as E,L as H,B as R,C as V,D as F,E as G,r as p,F as W,G as J,b as K,e as d,w as S,v as x,u as h,i as P,H as Q,o as X}from"./index-f62e9bd4.js";import{P as Y,m as Z,u as $}from"./mount-component-70145e1c.js";let y=0;function ee(e){e?(y||document.body.classList.add("van-toast--unclickable"),y++):y&&(y--,y||document.body.classList.remove("van-toast--unclickable"))}const[te,v]=D("toast"),ne=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay"],oe={icon:String,show:Boolean,type:C("text"),overlay:Boolean,message:b,iconSize:b,duration:A(2e3),position:C("middle"),teleport:[String,Object],wordBreak:String,className:O,iconPrefix:String,transition:C("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:O,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean};var z=T({name:te,props:oe,emits:["update:show"],setup(e,{emit:l,slots:n}){let u,i=!1;const c=()=>{const o=e.show&&e.forbidClick;i!==o&&(i=o,ee(i))},f=o=>l("update:show",o),g=()=>{e.closeOnClick&&f(!1)},s=()=>clearTimeout(u),a=()=>{const{icon:o,type:t,iconSize:_,iconPrefix:L,loadingType:U}=e;if(o||t==="success"||t==="fail")return m(E,{name:o||t,size:_,class:v("icon"),classPrefix:L},null);if(t==="loading")return m(H,{class:v("loading"),size:_,type:U},null)},r=()=>{const{type:o,message:t}=e;if(n.message)return m("div",{class:v("text")},[n.message()]);if(R(t)&&t!=="")return o==="html"?m("div",{key:0,class:v("text"),innerHTML:String(t)},null):m("div",{class:v("text")},[t])};return w(()=>[e.show,e.forbidClick],c),w(()=>[e.show,e.type,e.message,e.duration],()=>{s(),e.show&&e.duration>0&&(u=setTimeout(()=>{f(!1)},e.duration))}),j(c),M(c),()=>m(Y,N({class:[v([e.position,e.wordBreak==="normal"?"break-normal":e.wordBreak,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:g,onClosed:s,"onUpdate:show":f},q(e,ne)),{default:()=>[a(),r()]})}});const se={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let k=[],ae=!1,B=V({},se);const le=new Map;function ie(e){return G(e)?e:{message:e}}function ce(){const{instance:e,unmount:l}=Z({setup(){const n=p(""),{open:u,state:i,close:c,toggle:f}=$(),g=()=>{},s=()=>m(z,N(i,{onClosed:g,"onUpdate:show":f}),null);return w(n,a=>{i.message=a}),W().render=s,{open:u,close:c,message:n}}});return e}function re(){if(!k.length||ae){const e=ce();k.push(e)}return k[k.length-1]}function I(e={}){if(!F)return{};const l=re(),n=ie(e);return l.open(V({},B,le.get(n.type||B.type),n)),l}J(z);const de={class:"about"},ue=d("div",{class:"logo"}," myq ",-1),fe={class:"pho field"},me={class:"code"},ve={class:"codeWrap flex"},pe=["disabled"],ge=d("div",{class:"line1"},null,-1),ye=d("div",{class:"line2"},null,-1),we=T({__name:"AboutView",setup(e){let l=p(""),n=p(""),u=p("获取验证码"),i=p(!1),c=p();function f(s){let a=[[t=>!t.trim(),()=>I("用户名不能为空!")],[t=>!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(t),()=>I("请输入正确的手机号")]],r=s.target.value;const o=a.find(t=>t[0](r));o&&o[1](r)}function g(){let s=60;i.value=!0,c.value=setInterval(()=>{if(console.log("===",s),s===0){u.value="重新获取",i.value=!1,clearInterval(c.value);return}u.value=s--+"s"},1e3)}return M(()=>{clearTimeout(c.value),c.value=""}),(s,a)=>(X(),K("div",de,[ue,d("div",fe,[S(d("input",{type:"tel",placeholder:"请输入用户名","onUpdate:modelValue":a[0]||(a[0]=r=>P(l)?l.value=r:l=r),onChange:f},null,544),[[x,h(l)]])]),d("div",me,[d("div",ve,[S(d("input",{type:"password",placeholder:"请输入验证码","onUpdate:modelValue":a[1]||(a[1]=r=>P(n)?n.value=r:n=r)},null,512),[[x,h(n)]]),d("button",{disabled:h(i),onClick:g},Q(h(u)),9,pe)])]),ge,ye]))}});export{we as default};