export const state = () => ({
  users: [],
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  
}

export const actions = {
  async selectUsers({ commit, state }) {
    try {
      const res = await this.$axios.get(`https://reqres.in/api/users`, {
        params: { page: state.currentPage },
      })
      console.log('show', res.data)
      commit('setUsers', res.data.data)
      commit('setTotalPages', res.data.total_pages)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  },
}
