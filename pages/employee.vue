<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employeeList?.data"
      :options.sync="options"
      :server-items-length="employeeList?.total"
      :items-per-page="employeeList?.per_page"
      :item-key="selectEmployee?.data?.id"
      class="elevation-1"
      :footer-props="{
        itemsPerPageText: 'ໜ້າທີ :',
        itemsPerPageOptions: [5, 10, 20, 50, 100, -1],
        showFirstLastPage: true,
      }"
    >
      <template #[`item.avatar`]="{ item }">
        <v-avatar size="32">
          <v-img :src="item.avatar" alt="Avatar"></v-img>
        </v-avatar>
      </template>

      <template #[`item.actions`]="{ item }">
        <v-icon v-ripple color="red" @click="deleteEmployee(item.id)"
          >mdi-delete</v-icon
        >
        <v-icon v-ripple color="green" @click="editEmployee(item.id)"
          >mdi-pencil</v-icon
        >
        <v-icon v-ripple color="blue" @click="viewDetail(item.id)"
          >mdi-eye</v-icon
        >
      </template>
    </v-data-table>

    <!-- Dialog for user details -->
    <v-dialog v-model="viewDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title
          >{{ singleEmployee.first_name }}
          {{ singleEmployee.last_name }}</v-card-title
        >
        <v-card-text>
          <img
            :src="singleEmployee.avatar"
            :alt="`${singleEmployee.first_name} ${singleEmployee.last_name}`"
            style="max-width: 100%"
          />
          <p>Email: {{ singleEmployee.email }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="viewDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog for creating a new user -->
    <v-dialog v-model="editDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>Update New User</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newUser.first_name"
            label="Name"
          ></v-text-field>
          <v-text-field v-model="newUser.last_name" label="Job"></v-text-field>
          <v-text-field v-model="newUser.email" label="Email"></v-text-field>
          <v-text-field v-model="newUser.avatar" label="Avatar"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="updateEmployee">Create</v-btn>
          <v-btn @click="editDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'InspirePage',
  data() {
    return {
      viewDialog: false,
      editDialog: false,
      newUser: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
      },
      options: {},
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Email', value: 'email' },
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Avatar', value: 'avatar' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  computed: {
    ...mapState('employees', {
      employeeList: (state) => state.employee,
      singleEmployee: (state) => state.setSingle,
    }),
  },

  watch: {
    options(value) {
      const { itemsPerPage, page } = value
      this.selectEmployee({ per_page: itemsPerPage, page })
    },
    singleEmployee: {
      handler(newVal) {
        // Assign values to newUser when singleEmployee changes
        this.newUser.id = newVal.id
        this.newUser.first_name = newVal.first_name
        this.newUser.last_name = newVal.last_name
        this.newUser.email = newVal.email
        this.newUser.avatar = newVal.avatar
      },
      immediate: true,
    },
  },
  created() {
    this.selectEmployee()
  },
  methods: {
    ...mapActions('employees', ['selectEmployee', 'singleSelect', 'update']),
    deleteEmployee(id) {
      this.$axios
        .delete(`http://localhost:8080/employee/${id}`)
        .then((res) => {
          this.selectEmployee({
            per_page: this.options.itemsPerPage,
            page: this.options.page,
          })

          this.$success('Delete success!')
        })
        .catch((error) => {
          this.$error("Can't delete", error)
        })
    },

    viewDetail(id) {
      this.singleSelect(id)
      this.viewDialog = true
    },

    editEmployee(id) {
      this.singleSelect(id)
      this.editDialog = true
    },
    async updateEmployee() {
      try {
        await this.update(this.newUser)
        this.$success('Update success!')
        this.editDialog = false // Close the edit dialog
      } catch (error) {
        this.$error('Update failed', error)
      }
    },
  },
}
</script>

<style scoped>
.create-user-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
