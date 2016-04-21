export default (key) => ({
  get() {
    return JSON.parse(localStorage.getItem(key))
  },

  set(data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
})
