<template>
  <div @click="emitClick" class="transaction-container">
    <font-awesome-icon class="icon" :icon="icon" />
    <div class="transaction-info">
      <span class="title" v-if="title">{{ title }}</span>
      <span class="description">{{ value }}</span>
    </div>
    <div>
      {{ amount }}
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  name: "TransactionDetail",
  props: {
    icon: String,
    title: String,
    value: String,
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transaction-container {
  background-color: white;
  height: auto;
  padding: 15px 30px;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
span {
  display: block;
}

.description {
  color: #1e88e5;
  font-size: 18px;
  font-weight: 400;
}

.title {
  color: #666;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 5px;
}

.icon {
  color: #7eb3e2;
  margin-right: 20px;
}
</style>
