import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    email: "",
    token: "",
  },
  getters: {},
  mutations: {
    login(state, email) {
      state.email = email;
      localStorage.setItem("email", email),
        axios
          .get("https://opentdb.com/api_token.php?command=request")
          .then((response) => {
            state.token = response.data.token;
          });
      alert("logged in");
    },
    logout(state) {
      state.email = "";
      state.token = "";
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      alert("logged out");
    },
    initializeStore(state) {
      if (localStorage.getItem("email")) {
        state.email = localStorage.getItem("email");
      }
    },
  },
  actions: {},
  modules: {},
});
