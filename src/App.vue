<template>
  <div class="container">
    <nav>
      <div v-if="!$store.state.email">
        <form @submit.prevent="submit">
          <div>
            <input type="email" v-model="form.email" placeholder="Email" />
            <input
              type="password"
              v-model="form.password"
              placeholder="password"
            />
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </nav>
    <div class="difficulty">
      <router-link v-if="$store.state.email" to="/easy">Easy</router-link>
      <router-link v-if="$store.state.email" to="/medium">Medium</router-link>
      <router-link v-if="$store.state.email" to="/hard">Hard</router-link>
      <a class="logout" v-if="$store.state.email" @click="logout" href="/"
        >Logout</a
      >
    </div>
    <router-view />
  </div>
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
