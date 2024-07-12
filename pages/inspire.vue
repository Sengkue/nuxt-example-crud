<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="userList"
      :single-select="singleSelect"
      :options.sync="options"
      :server-items-length="total"
      :items-per-page="per_page"
      item-key="id"
      show-select
      class="elevation-1"
    >
      <template #[`item.avatar`]="{ item }">
        <v-avatar size="32">
          <v-img :src="item.avatar" alt="Avatar"></v-img>
        </v-avatar>
      </template>

      <template #top>
        <v-switch
          v-model="singleSelect"
          label="Single select"
          class="pa-3"
        ></v-switch>
      </template>
    </v-data-table>
    <v-btn
      class="create-user-btn"
      fixed
      bottom
      right
      color="primary"
      @click="saveToDatabase"
      >save To Database</v-btn
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'InspirePage',
  data() {
    return {
      options: {},
      singleSelect: false,
      selected: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Avatar', value: 'avatar' },
      ],
    }
  },
  computed: {
    ...mapState({
      userList: (state) => state.users,
      currentPage: (state) => state.currentPage,
      totalPages: (state) => state.totalPages,
      selectedUser: (state) => state.selectedUser,
      dialogVisible: (state) => state.dialogVisible,
      total: (state) => state.total,
      page: (state) => state.page,
      per_page: (state) => parseInt(state.per_page),
    }),
  },

  watch: {
    options(value) {
      const { itemsPerPage, page } = value
      this.selectUsersTable({ per_page: itemsPerPage, page })
      // this.$store.dispatch("selectUsersTable", { per_page: itemsPerPage, page })
    },
  },
  created() {
    this.selectUsers() // Initial fetch of users data
  },
  methods: {
    ...mapActions([
      'selectUsers',
      'createNewUser',
      'selectUsersTable',
    ]),

    saveToDatabase() {
      this.$axios
        .post('http://localhost:8080/employee/array', this.selected)
        .then((res) => {
          this.$success('Success!')
        })
        .catch((error) => {
          this.$error('Already exists')
          console.error('Error saving to database:', error)
        })
    },
  },
}
</script>

<style scoped>
/* Add any scoped styles here */
.create-user-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
