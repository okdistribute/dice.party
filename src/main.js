import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

// https://cli.vuejs.org/guide/mode-and-env.html#modes
let msgHost
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  msgHost = 'http://localhost:3000'
} else {
  // production
  msgHost = ''
}
app.config.globalProperties.$messageHost = msgHost

app.mount('#app')
