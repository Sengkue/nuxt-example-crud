export const state = () => ({
  employee: [],
  setSingle: {},
})

export const mutations = {
  setEmployee(state, data) {
    state.employee = data
  },
  setSingle(state, data) {
    state.setSingle = data
  },
}

export const actions = {
  async selectEmployee({ commit }, params) {
    try {
      const res = await this.$axios.get(
        `http://localhost:8080/employee/pagination`,
        {
          params,
        }
      )
      commit('setEmployee', res.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  },
  singleSelect({ commit }, id) {
    this.$axios.get(`http://localhost:8080/employee/${id}`).then((res) => {
      commit('setSingle', res.data)
    })
  },
  update({ commit, dispatch }, data) {
    this.$axios.put(`http://localhost:8080/employee/${data.id}`, data)
    dispatch('selectEmployee')
  },
}
