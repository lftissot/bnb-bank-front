<template>
  <div>
    <font-awesome-icon icon="comments-dollar" class="icon" /> No records found.
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  components: {
    FontAwesomeIcon,
  },
  name: "EmptyList",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  font-size: 20px;
  color: #ddd;
  width: 100%;
  padding: 60px 0px;
}
.icon {
  font-size: 30px;
}
</style>
