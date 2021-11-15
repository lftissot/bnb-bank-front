import AuthService from "@/services/auth.svc";

const AuthModule = {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async authenticate({ commit }, authData) {
      await AuthService.loginWithData(authData)
        .then((r) => {
          commit("setToken", r.data.token);
        })
        .catch(() => {});
    },
    logout({ commit }) {
      commit("setToken", "");
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
  },
};

export default AuthModule;
