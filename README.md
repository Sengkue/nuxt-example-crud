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

## server.js

```javascript

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

# nuxt-example-crud
