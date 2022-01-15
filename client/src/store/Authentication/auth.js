import axios from "axios";
import router from "../../router/index.js";
export default {
  namespaced: true,
  state: () => ({
    status: "",
    token: localStorage.getItem("neksk_token") || "",
    user: "",
    token1: "",
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isInput: (state) => !!state.user,
    authStatus: (state) => state.status,
    token: (state) => state.token,
    token11: (state) => {
      let tokentest = `Тестовый токен: ${state.token1}`;
      return tokentest;
    },
    user: (state) => state.user,
    //isAdmin: (state) => state.user.typeUser.includes("Admin"),
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.user = payload.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    },
    test(state, user, token) {
      state.user = user;
      state.token1 = token;
    },
  },
  actions: {
    logout({ commit }) {
      //console.log("xxxxxxxxxxxx");
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("neksk_token");
        console.log("промис");
        // delete axios.defaults.headers.common['Authorization']
        resolve();
      }).then(() => {
        console.log("после промис");
        router.push({ name: "Home" });
      });
    },
    login({ commit }, payload) {
      commit("auth_success", payload);
    },

    chek_token({ dispatch, commit }, payload) {
      //console.log(`Токен: ${token}`);
      //axios.post("/api/check_token", { token: www }).then((response) => {
      console.log(`телефон пользователя: ${payload.user.telUser}`);
      if (payload.user == "") {
        console.log("нет ни одного пользователя с таким id");
        dispatch("logout");
      } else {
        console.log("fffffffffffffffffffffffffff");
        commit("auth_success", { token: payload.token33, user: payload.user });
      }
    },
    registered({ commit }, user) {
      //return new Promise((resolve, reject) => {
      commit("auth_request");
      axios.post("/api/adduser", { data: user }).then((resp) => {
        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem("neksk_token", token);
        //axios.defaults.headers.common['Authorization'] = token
        commit("auth_success", token, user);

        //resolve(resp);
      });
      // };
    },
  },
};
