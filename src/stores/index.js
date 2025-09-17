import { createPinia } from 'pinia'
import persistence from './persistence'

export * from './modules'

const pinia = createPinia()
pinia.use(persistence)
export default pinia
