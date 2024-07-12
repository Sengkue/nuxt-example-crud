// store/index.js

export const state = () => ({
  users: [],
  currentPage: 1,
  totalPages: 0,
  selectedUser: {}, // Added selectedUser state
  dialogVisible: false, // Added dialogVisible state
  total: 0,
  page: 0,
  per_page: 0,
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setCurrentPage(state, page) {
    state.currentPage = page
  },
  setTotalPages(state, totalPages) {
    state.totalPages = totalPages
  },
  setSelectedUser(state, user) {
    state.selectedUser = user
  },
  setDialogVisible(state, visible) {
    state.dialogVisible = visible
  },
  setTotal(state, total) {
    state.total = total
  },
  setPage(state, page) {
    state.page = page
  },
  setPerPage(state, data) {
    state.per_page = data
  },
}

export const actions = {
  async selectUsersTable({ commit, state }, params) {
    commit('setCurrentPage', params.page)
    commit('setPerPage', params.per_page)

    try {
      const res = await this.$axios.get(`https://reqres.in/api/users`, {
        params: { page: state.currentPage, per_page: state.per_page },
      })
      commit('setUsers', res.data.data)
      commit('setTotalPages', res.data.total_pages)
      commit('setTotal', res.data.total)
      commit('setPage', res.data.page)
      commit('setPerPage', res.data.per_page)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  },
  async selectUsers({ commit, state }) {
    try {
      const res = await this.$axios.get(`https://reqres.in/api/users`, {
        params: { page: state.currentPage, per_page: state.per_page },
      })
      console.log('show', res.data)
      commit('setUsers', res.data.data)
      commit('setTotalPages', res.data.total_pages)
      commit('setTotal', res.data.total)
      commit('setPage', res.data.page)
      commit('setPerPage', res.data.per_page)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  },

  async nextPage({ commit, dispatch, state }) {
    if (state.currentPage < state.totalPages) {
      commit('setCurrentPage', state.currentPage + 1)
      await dispatch('selectUsers')
    }
  },
  async prevPage({ commit, dispatch, state }) {
    if (state.currentPage > 1) {
      commit('setCurrentPage', state.currentPage - 1)
      await dispatch('selectUsers')
    }
  },
  async openDialog({ commit }, userId) {
    try {
      const res = await this.$axios.get(`https://reqres.in/api/users/${userId}`)
      commit('setSelectedUser', res.data.data)
      commit('setDialogVisible', true)
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  },

  createNewUser({ commit }, data) {
    this.$axios.post('https://reqres.in/api/users', data).then((res) => {
      console.log(res.data)
    })
  },
}
