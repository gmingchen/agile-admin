export default function bindExposed(ref) {
  const instance = getCurrentInstance()
  if (ref.value.$.exposed) {
    const entries = Object.entries(ref.value.$.exposed)
    for (const [key, value] of entries) {
      if (instance.exposed) {
        instance.exposed[key] = value
      }
    }
  }
}
