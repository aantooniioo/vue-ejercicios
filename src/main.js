import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Pinia (EJERCICIO 1)
import { createPinia } from 'pinia'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')