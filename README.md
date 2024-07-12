# Nust version2 Project

This project is a basic nuxt that includes vuetify, axios, cookies, toast, comment and other functionality that needs to be implemented by the developers to be able to create custom views for various components.

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites

- Node.js veriosn 16x or 18x

### Installing

1. If clone the repository not do the next step, if not clone do step by step:

   ```sh
   git clone https://github.com/Sengkue/nuxt-exmaple-crud01
   cd nuxt-exmaple-crud01
   yarn install
   ```

   ```sh
   mkdir nuxt-exmaple-crud01
   cd nuxt-exmaple-crud01
   ```

2. Install the required npm packages:

   ```sh
   npx create-nuxt-app <project-name>
   yarn create nuxt-app <project-name>
   npm init nuxt-app <project-name>
   ```

3. white install do this step:

```javascript
   ? Project name: test-example
   ? Programming language: JavaScript
   ? Package manager: Yarn
   ? UI framework: Vuetify.js
   ? Template engine: HTML
   ? Nuxt.js modules: Axios - Promise based HTTP client
   ? Linting tools: ESLint, Prettier
   ? Testing framework: None
   ? Rendering mode: Universal (SSR / SSG)
   ? Deployment target: Server (Node.js hosting)
   ? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
   ? Continuous integration: None
   ? Version control system: Git
```

4. install all package or library:

```sh
npm i cookie-universal-nuxt moment @nuxtjs/toast@1.0.0 @nuxtjs/axios
```

after installing go to add this code to nuxt.config.js

```sh
modules: [
'cookie-universal-nuxt',
'@nuxtjs/axios',
'@nuxtjs/toast'
]
```

### details:

<a href="https://www.npmjs.com/package/cookie-universal-nuxt" target="_blank">cookies more detail</a>
<a href="https://www.npmjs.com/package/@nuxtjs/toast/v/1.0.0" target="_blank">toast more detail</a>
<a href="https://axios.nuxtjs.org/setup/" target="_blank">axios more detail</a>
<a href="https://www.npmjs.com/package/moment" target="_blank">moment more detail</a>

# Code

## create folder plugins

### plusgins/globle.js:

```javascript
import Vue from "vue";
import moment from 'moment';
if (!Vue.**my_mixin**) {
Vue.**my_mixin** = true;
Vue.mixin({
 data() {
   return {};
 },
 computed: {},
 methods: {
   formatPrice(value){
     const val = (value / 1).toFixed(0).replace(",", ".");
     return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     },
   currency(data) {
     return this.$test(data, { precision: 0, symbol: "₭" }).format();
   },
   formatDate(dateString) {
     const date = new Date(dateString);
     const day = date.getDate();
     const month = date.getMonth() + 1;
     const year = date.getFullYear();
     return `${day}-${month}-${year}`;
   },
   formatDateBill(date) {
     return moment(date).format('DD/MM/YYYY, HH:mm:ss');
   },
 },
});
}
```

### plugins/axios.js:

```javascript
export default function (context) {
  context.$axios.onRequest((config) => {
    config.baseURL = context.app.$config.api
    config.headers.common.Authorization = `SENG ${context.$cookies.get(
      'token'
    )}`
  })
  // context.$axios.onError((error) => {
  // Sending the toast messages.
  // if (error.response.status !== 401) context.$toast.error(error)
  // return Promise.resolve(false)
  // return false
  // })
}
```

## create folder middleware

### check user are there token middleware/auth.js :

```javascript
export default function (context) {
  if (!context.$cookies.get('token')) {
    return context.redirect('/login')
  }
}
```

### check user are there token middleware/onLogin.js :

```javascript
export default function (context) {
  if (context.$cookies.get('token')) {
    return context.redirect('/')
  }
}
```

## folder layout

### create new file example layout/blank.js

```javascript
<template>
  <v-app :dark="dark">
    <Nuxt/>
  </v-app>
</template>

<script>
export default {
  name: 'EcommerceLandingBlank',
  middleware: 'onLogin',
  created(){
    this.dark = this.$cookies.get('mode')
    this.$vuetify.theme.dark = this.dark
    },
};
</script>
```

### if you want some pages use layout/blank.js

```javascript
<template>
  <div>
    hello world!
  </div>
</template>

<script>
export default {
  name: 'EcommerceLandingBlank',
  layout: 'blank',
};
</script>
```

### Running the Server

1. To start project, run:

```sh
npm run dev
```

The server will run port (default: 3000).

## Project Structure

- `page`:
- `component`:
- `store`:
- `plugin`:
- `layout`:
- `middleware`:

# Code

## vuetify UI

### data table with checkboxes

```javascript
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

```

## VueX or Store

### example store/index.js 

```javascript
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


```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# nuxt-example-crud
