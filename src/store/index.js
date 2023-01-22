import { createStore } from "vuex";
import axios from "axios";
const token_api = "https://opentdb.com/api_token.php?command=request";
const quiz_api = "https://opentdb.com/api.php?";
const amount = "amount=";
const difficulty = "&difficulty=";
const type = "&type=multiple";

export default createStore({
  state: {
    email: "",
    token: "",
    listEasy: [],
    listMedium: [],
    listHard: [],
  },
  getters: {},
  mutations: {
    login(state, email) {
      state.email = email;
      localStorage.setItem("email", email),
        axios.get(token_api).then((response) => {
          state.token = response.data.token;
          axios
            .get(
              quiz_api +
                amount +
                10 +
                difficulty +
                "easy" +
                type +
                "&token=" +
                state.token
            )
            .then((response) => {
              state.listEasy = response.data.results;
            });
          axios
            .get(
              quiz_api +
                amount +
                10 +
                difficulty +
                "medium" +
                type +
                "&token=" +
                state.token
            )
            .then((response) => {
              state.listMedium = response.data.results;
            });
          axios
            .get(
              quiz_api +
                amount +
                10 +
                difficulty +
                "hard" +
                type +
                "&token=" +
                state.token
            )
            .then((response) => {
              state.listHard = response.data.results;
            });
        });

      alert("logged in");
    },
    logout(state) {
      state.email = "";
      localStorage.removeItem("email");
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
