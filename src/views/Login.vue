<template>
  <el-row justify="space-around" class="card">
    <el-col :xs="22" :sm="18" :md="12" :lg="12" :xl="10">
      <el-card>
        <div class="home">
          <div class="logo"><span>BNB</span><span>BANK</span></div>
          <el-form :rules="rules" :model="form" ref="form">
            <el-form-item prop="username">
              <el-input placeholder="Username" v-model="form.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                placeholder="Password"
                v-model="form.password"
              />
            </el-form-item>
            <el-button type="primary" @click="handleLogin">Login</el-button>
          </el-form>
          <div class="to-login">
            <router-link to="/register">Create new account</router-link>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {
  ElForm,
  ElButton,
  ElFormItem,
  ElInput,
  ElCard,
  ElRow,
  ElCol,
  ElMessage,
} from "element-plus";

import { useCookies } from "vue3-cookies";
import JwtHelper from "@/helpers/jwt-helper";

export default {
  name: "Login",
  components: {
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
    ElCard,
    ElRow,
    ElCol,
  },
  mounted() {
    const cookieToken = this.cookies.get("token");
    if (cookieToken) {
      this.$store.dispatch("setToken", cookieToken);
      this.redirectLoginSuccess();
    }
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    const form = { username: null, password: null };
    const rules = {
      username: [
        {
          required: true,
          message: "Username is required",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Password is required",
          trigger: "blur",
        },
      ],
    };

    return {
      form,
      rules,
    };
  },
  methods: {
    async handleLogin() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        await this.$store.dispatch("authenticate", this.form);

        if (this.$store.state.auth.token) {
          this.cookies.set("token", this.$store.state.auth.token);
        } else {
          ElMessage.error({
            message: "Oops. Invalid user or password.",
            "show-close": true,
            duration: 5000,
          });
        }

        this.redirectLoginSuccess();
      });
    },
    redirectLoginSuccess() {
      const decodedToken = JwtHelper.decode(this.$store.state.auth.token);
      if (decodedToken.isAdmin) this.$router.push("/admin/pending");
      else this.$router.push("/banking/transactions");
    },
  },
};
</script>

<style scoped>
.to-login {
  margin-top: 15px;
  font-size: 12px;
}
.card {
  margin-top: 15px;
}

.logo {
  padding: 80px;
  font-size: 48px;
  letter-spacing: -4px;
}

.logo span:first-child {
  font-weight: 900;
  color: #666;
}

.logo span:last-child {
  font-weight: 100;
}
</style>
