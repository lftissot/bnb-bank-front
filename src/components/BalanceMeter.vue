<template>
  <div class="balance-container" :style="{ 'background-color': color }">
    <div class="balance-info">
      <span class="title">{{ title }}</span>
      <span class="amount">{{ formatAmount(amount) }}</span>
    </div>
    <div
      v-if="actionIcon != undefined"
      class="balance-action clickable"
      @click="emitClick"
    >
      <font-awesome-icon :icon="actionIcon" />
      <span>{{ actionText }}</span>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "BalanceMeter",
  props: {
    title: String,
    amount: Number,
    color: String,
    actionIcon: String,
    actionText: String,
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    formatAmount(value) {
      return value != undefined ? "$" + value.toFixed(2) : "";
    },
    emitClick() {
      this.$emit("action");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.balance-container {
  height: auto;
  padding: 15px 30px;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
span {
  display: block;
}

.balance-action {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: auto;
  color: white;
  min-width: 100px;
}

.balance-action *:not(svg) {
  font-size: 10px;
  text-transform: uppercase;
}

.amount {
  color: #fff;
  font-size: 24px;
  font-weight: 300;
}

.title {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
}

.clickable {
  cursor: pointer;
}
</style>
