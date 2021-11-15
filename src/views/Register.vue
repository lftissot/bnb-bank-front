<template>
  <el-row justify="space-around" class="card">
    <el-col :xs="22" :sm="18" :md="12" :lg="12" :xl="10">
      <el-card>
        <div class="logo"><span>BNB</span><span>BANK</span></div>
        <el-form :rules="rules" :model="form" ref="form">
          <el-form-item prop="username">
            <el-input placeholder="Username" v-model="form.username" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="Email" v-model="form.email" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="Password"
              v-model="form.password"
            />
          </el-form-item>
          <el-button type="primary" @click="handleRegister">Sign-up</el-button>
          <div class="to-login">
            <router-link to="/login">Already have an account?</router-link>
          </div>
        </el-form>
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
import AuthService from "@/services/auth.svc";

export default {
  name: "Register",
  components: {
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
    ElCard,
    ElRow,
    ElCol,
  },
  methods: {
    handleRegister() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        AuthService.register(this.form);
        ElMessage.success({
          message: "User successfully registered!",
          duration: 5000,
        });
        this.$router.push("/login");
      });
    },
  },
  data() {
    const form = {
      username: null,
      password: null,
      email: null,
    };
    const rules = {
      username: [
        {
          required: true,
          message: "Username is required",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          email: true,
          message: "Email is required",
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
