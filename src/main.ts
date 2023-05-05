import { createApp, h } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "animate.css";
import { Button, Icon, SkeletonParagraph } from 'vant';
import 'vant/lib/index.css';
import 'virtual:svg-icons-register';
// eslint-disable-next-line
import svgIcon from "./components/SvgIcon/index.vue";


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Button);
app.use(Icon);
app.use(SkeletonParagraph);
app.component('svg-icon', svgIcon)

// app.component('Demo', {
//   render(){
//     return h('div', 'demo组件')
//   }
// })

app.mount("#app");
