import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/icon' // svg 图标引入
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const app = createApp(App)

const globalComponents = require.context('./components', true, /index\.(vue|js)$/i)
globalComponents.keys().forEach(filePath => {
  const component = globalComponents(filePath)
  let name = path.resolve(filePath, '..')
  name = upperFirst(
    camelCase(
      name
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  app.component(
    name,
    component.default || component
  )
})

app.use(store)
  .use(router)
  .mount('#app')
