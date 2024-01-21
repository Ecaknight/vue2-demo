<template>
  <div id="app">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <nav>
        <!-- <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/form">form</router-link>
        <router-link to="/formValidate">formValidate</router-link> -->
        <router-link v-for="item in routes" :key="item.name" :to="item.path">{{ item.name }}</router-link>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
import { routes } from '@/router/index.js';

export default {
  data() {
    return {
      routes,
    };
  },
};
</script>
<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (width >= 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    place-items: flex-start;
  }

  nav {
    padding: 1rem 0;
    margin-top: 1rem;
    margin-left: -1rem;
    font-size: 1rem;
    text-align: left;
  }
}
</style>
