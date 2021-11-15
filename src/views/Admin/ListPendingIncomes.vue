<template>
  <el-card body-style="padding: 0px;">
    <TitleDatePicker title="Pending Checks" @dateChanged="handleDateChange" />
    <TransactionItem
      :title="income.user.username"
      :amount="income.amount"
      :description="income.executed_on"
      v-for="income in incomes"
      :key="income.id"
      @selected="handleSelected(income)"
      class="clickable"
    />
    <EmptyList v-if="!incomes || incomes.length == 0" />
  </el-card>
</template>

<script>
import TransactionItem from "@/components/TransactionItem";
import TitleDatePicker from "@/components/TitleDatePicker";
import { ElCard } from "element-plus";
import EmptyList from "@/components/EmptyList";

export default {
  name: "ListPendingIncomes",
  components: {
    TransactionItem,
    TitleDatePicker,
    ElCard,
    EmptyList,
  },
  mounted() {
    this.$store.dispatch("fetchPendingChecks");
  },
  computed: {
    incomes() {
      return this.$store.state.admin.pendingChecks;
    },
  },
  methods: {
    handleSelected(transaction) {
      this.$router.push({
        name: "IncomeDetails",
        params: { id: transaction.id },
      });
    },
    handleDateChange(month) {
      this.$store.dispatch("fetchPendingChecks", month);
    },
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
