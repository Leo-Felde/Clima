import { createApp } from 'vue'
import App from './App.vue'

import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'

const app = createApp(App)
app.use(mdiVue, {
  icons: mdijs
})

app.mount('#app')
