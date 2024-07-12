<template>
  <div class="user-list">
    <ul class="user-items">
      <li v-for="user in users" :key="user.id" class="user-item">
        <div class="user-avatar">
          <img
            :src="user.avatar"
            :alt="`${user.first_name} ${user.last_name}`"
          />
        </div>
        <div class="user-details">
          <p class="user-name">{{ user.first_name }} {{ user.last_name }}</p>
          <p class="user-email">{{ user.email }}</p>
          <v-btn @click="openDialog(user.id)" color="primary"
            >View Details</v-btn
          >
        </div>
      </li>
    </ul>

    <!-- Dialog for user details -->
    <v-dialog v-model="dialogVisible" max-width="600px" persistent>
      <v-card>
        <v-card-title
          >{{ selectedUser.first_name }}
          {{ selectedUser.last_name }}</v-card-title
        >
        <v-card-text>
          <img
            :src="selectedUser.avatar"
            :alt="`${selectedUser.first_name} ${selectedUser.last_name}`"
            style="max-width: 100%"
          />
          <p>Email: {{ selectedUser.email }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog for creating a new user -->
    <v-dialog v-model="createDialogVisible" max-width="600px" persistent>
      <v-card>
        <v-card-title>Create New User</v-card-title>
        <v-card-text>
          <v-text-field v-model="newUser.name" label="Name"></v-text-field>
          <v-text-field v-model="newUser.job" label="Job"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="createNewUser">Create</v-btn>
          <v-btn @click="createDialogVisible = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">Previous</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>

    <v-btn
      class="create-user-btn"
      fixed
      bottom
      right
      color="primary"
      @click="createDialogVisible = true"
      >Create New User</v-btn
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      createDialogVisible: false,
      newUser: {
        name: '',
        job: '',
      },
    }
  },
  computed: {
    ...mapState([
      'users',
      'currentPage',
      'totalPages',
      'selectedUser',
      'dialogVisible',
    ]),
  },
  methods: {
    ...mapActions(['nextPage', 'prevPage', 'selectUsers', 'openDialog']),
    closeDialog() {
      this.$store.commit('setDialogVisible', false)
    },
    createNewUser() {
      this.$store.dispatch('createNewUser', this.newUser)
      this.createDialogVisible = false
      this.$success('success creat user')
    },
  },
  created() {
    this.selectUsers() // Initial fetch of users data
  },
}
</script>

<style scoped>
.user-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.user-items {
  list-style: none;
  padding: 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: bold;
}

.user-email {
  font-size: 14px;
  color: #666;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 16px;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-size: 16px;
}
.create-user-btn {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
