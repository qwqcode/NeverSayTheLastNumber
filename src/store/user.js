export default {
  state: {
    name: null
  },
  getters: {
    getUserName: (state) => () => {
      let username = state.name
      if (!username) {
        username = window.localStorage.getItem('username') || null
      }
      return username
    }
  },
  mutations: {
    setUserName (state, name) {
      window.localStorage.setItem('username', name)
      state.name = name
    }
  }
}
