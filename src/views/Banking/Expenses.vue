<template>
  <el-card body-style="padding: 0px;">
    <TitleDatePicker title="Expenses" @dateChanged="handleDateChange" />
    <TransactionItem
      :title="expense.description"
      :amount="expense.amount"
      :description="expense.executed_on"
      v-for="expense in expenses"
      :key="expense.id"
    />
    <EmptyList v-if="!expenses || expenses.length == 0" />
    <el-button type="primary" size="medium" circle @click="createExpense"
      ><font-awesome-icon icon="plus"
    /></el-button>
  </el-card>
</template>

<script>
import TransactionItem from "@/components/TransactionItem";
import TitleDatePicker from "@/components/TitleDatePicker";
import { ElCard, ElButton } from "element-plus";
import EmptyList from "@/components/EmptyList";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Expenses",
  components: {
    TransactionItem,
    TitleDatePicker,
    ElCard,
    FontAwesomeIcon,
    ElButton,
    EmptyList,
  },
  mounted() {
    this.$store.dispatch("fetchExpenses", null);
  },
  computed: {
    expenses() {
      return this.$store.state.banking.expenses;
    },
  },
  methods: {
    handleDateChange(month) {
      this.$store.dispatch("fetchExpenses", month);
    },
    createExpense() {
      this.$router.push("/banking/expenses/new");
    },
  },
};
</script>

<style scoped>
.el-button.is-circle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
}
</style>
