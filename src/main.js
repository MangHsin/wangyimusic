import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import getVant from './plugins'


const app = createApp(App)
getVant(app)
app.use(store).use(router).mount('#app')