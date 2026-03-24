import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Material Design
import '@mdi/font/css/materialdesignicons.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// Pinia
import { createPinia } from 'pinia'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme: {
        dark: true,
        colors: {
          primary: '#3b82f6',
          secondary: '#6366f1',
          error: '#ef4444',
          background: '#121212',
          surface: '#1e1e1e'
        }
      }
    }
  }
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')