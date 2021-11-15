import axios from "axios";

import store from "@/store/index";

class AuthService {
  loginWithData(data) {
    return axios.post("/api/auth/login", data);
  }

  async register(user) {
    return axios.post("/api/auth/register", user);
  }

  logout() {
    store.commit("clearToken");
  }
}

export default new AuthService();
