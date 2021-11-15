<template>Signing-out...</template>

<script>
import { useCookies } from "vue3-cookies";

export default {
  name: "Logout",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  mounted() {
    this.cookies.remove("token");
    this.$store.dispatch("logout");
    this.$router.push("login");
  },
};
</script>
