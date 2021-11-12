import { reactive } from 'vue'

export default function () {
  const page = reactive({
    current: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100, 200]
  })

  return {
    page
  }
}
