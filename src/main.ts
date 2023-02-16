import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '/@/theme/index.scss';
import tool from '/@/utils/tool'
import pinia from '/@/stores/index'
import { i18n } from "/@/i18n";

const app = createApp(App);
tool.slSvg(app)
app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n)

app.mount('#app');
