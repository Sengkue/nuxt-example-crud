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
npm i cookie-universal-nuxt
```

after installing go to add this code to nuxt.config.js

```sh
modules: [
'cookie-universal-nuxt',
]
```

<a href="https://www.npmjs.com/package/cookie-universal-nuxt" target="_blank">more detail</a>

5. here install axios:
   ```sh
   yarn add @nuxtjs/axios
   npm install @nuxtjs/axios
   ```
   after that go to add this code to nuxt.config.js :

```sh
modules: ['@nuxtjs/axios']
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
