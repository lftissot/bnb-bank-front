<template>
  <div @click="emitClick" class="transaction-container">
    <div class="transaction-info">
      <span class="title" v-if="title">{{ title }}</span>
      <span class="title missing" v-else>No description</span>
      <span class="description">{{ formatDate(description) }}</span>
    </div>
    <div :class="{ 'transaction-amount': true, expense: amount < 0 }">
      {{ formatAmount(amount) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionItem",
  props: {
    title: String,
    description: String,
    amount: Number,
    key: Number,
  },
  methods: {
    emitClick() {
      this.$emit("selected");
    },
    formatDate(date) {
      date = new Date(date);
      return date.toLocaleString("en-US");
    },
    formatAmount(value) {
      return "$" + value.toFixed(2);
    },
  },
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
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
span {
  display: block;
}

.transaction-info {
  max-width: 80%;
}
.description {
  color: #333;
  font-size: 14px;
  font-weight: 400;
}

.title {
  color: #1e88e5;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.missing {
  color: #666;
  font-style: italic;
  font-weight: 400;
}

.transaction-amount {
  font-size: 18px;
  color: #1e88e5;
}

.expense {
  color: red;
}
</style>
