<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="true"
        :router="true"
      >
        <el-menu-item index="/banking/transactions">
          <img src="@/assets/logo.jpg" class="logo" />
        </el-menu-item>
        <el-menu-item index="/banking/transactions">
          <font-awesome-icon icon="balance-scale-right" />
          <template #title>Balance</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <font-awesome-icon icon="level-up-alt" />
          <template #title>Incomes</template>
        </el-menu-item>
        <el-menu-item index="/banking/expenses">
          <font-awesome-icon icon="level-down-alt" />
          <template #title>Expenses</template>
        </el-menu-item>
        <el-menu-item index="/banking/incomes">
          <font-awesome-icon icon="money-check" />
          <template #title>Checks</template>
        </el-menu-item>
        <el-menu-item index="6" disabled>
          <font-awesome-icon icon="bell" />
          <template #title>Notifications</template>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <font-awesome-icon icon="user" />
          <template #title>Profile</template>
        </el-menu-item>
        <el-menu-item index="8" disabled>
          <font-awesome-icon icon="cog" />
          <template #title>Settings</template>
        </el-menu-item>
        <el-menu-item index="9" disabled>
          <font-awesome-icon icon="question-circle" />
          <template #title>Help</template>
        </el-menu-item>
        <el-menu-item index="/logout">
          <font-awesome-icon icon="sign-out-alt" />
          <template #title>Sign out</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <el-row justify="space-around">
        <el-col :xs="22" :sm="18" :md="12" :lg="12" :xl="10">
          <router-view />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {
  ElMenu,
  ElMenuItem,
  ElRow,
  ElCol,
  ElMain,
  ElAside,
  ElContainer,
} from "element-plus";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    //Location,
    // IconMenu,
    ElMenu,
    ElMenuItem,
    ElRow,
    ElCol,
    ElMain,
    ElAside,
    ElContainer,
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.logo {
  width: 100%;
}

svg {
  position: relative;
  bottom: 20px;
}
</style>
