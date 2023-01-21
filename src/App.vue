<template>
  <nav class="pt-5 ml-5 mr-5">
    <div v-if="!$store.state.email" class="flex">
      <form @submit.prevent="submit">
        <div class="flex-auto w-33"></div>
        <div class="flex-auto w-40"></div>
        <div class="flex-auto w-20">
          <input
            class="ml-5"
            type="email"
            v-model="form.email"
            placeholder="Email"
          />
          <input
            class="ml-5"
            type="password"
            v-model="form.password"
            placeholder="password"
          />
          <button type="submit" class="bg-slate-300 ml-5 h-8 w-20">
            Login
          </button>
        </div>
      </form>
    </div>
    <div>
      <div class="flex-auto w-33"></div>
      <div class="flex-auto w-40"></div>
      <div class="flex-auto w-20">
        <a v-if="$store.state.email" @click="logout" href="/">Logout</a>
      </div>
      <p>{{ $store.state.email }}</p>
    </div>
  </nav>
  <router-link v-if="$store.state.email" to="/easy">Easy</router-link>
  <router-link v-if="$store.state.email" to="/medium">Medium</router-link>
  <router-link v-if="$store.state.email" to="/hard">Hard</router-link>
  <router-view />
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      this.$store.commit("login", this.form.email);
    },
    logout() {
      this.$store.commit("logout");
    },
  },
  mounted() {
    this.$store.commit("initializeStore");
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
