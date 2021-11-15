<template>
  <div class="about">
    <button v-on:click="logout()">Sair</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("clearToken");
      this.$router.push("login");
    },
  },
};
</script>
