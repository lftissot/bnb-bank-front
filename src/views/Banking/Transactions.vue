<template>
  <el-card body-style="padding: 0px;">
    <BalanceMeter
      color="#1e88e5"
      title="Current balance"
      :amount="balance.balance"
    />
    <BalanceMeter
      color="#42a5f5"
      title="Incomes"
      :amount="balance.incomes"
      action-icon="plus"
      action-text="deposit a check"
      @action="deposit"
    />
    <BalanceMeter
      color="#64b5f6"
      title="Expenses"
      :amount="balance.expenses"
      action-icon="plus"
      action-text="purchase"
      @action="purchase"
    />
    <TitleDatePicker title="Transactions" @dateChanged="handleDateChange" />
    <TransactionItem
      :title="transaction.description"
      :amount="transaction.amount"
      :description="transaction.executed_on"
      v-for="transaction in transactions"
      :key="transaction.id"
    />
    <EmptyList v-if="!transactions || transactions.length == 0" />
  </el-card>
</template>

<script>
import TransactionItem from "@/components/TransactionItem";
import BalanceMeter from "@/components/BalanceMeter";
import TitleDatePicker from "@/components/TitleDatePicker";
import EmptyList from "@/components/EmptyList";
import { ElCard } from "element-plus";

export default {
  name: "Transactions",
  components: {
    TransactionItem,
    ElCard,
    BalanceMeter,
    TitleDatePicker,
    EmptyList,
  },
  mounted() {
    this.$store.dispatch("fetchTransactions", null);
    this.$store.dispatch("fetchBalance");
  },
  computed: {
    transactions() {
      return this.$store.state.banking.transactions;
    },
    balance() {
      return this.$store.state.banking.balance;
    },
  },
  methods: {
    purchase() {
      this.$router.push("/banking/expenses/new");
    },
    deposit() {
      this.$router.push("/banking/incomes/new");
    },
    handleDateChange(month) {
      this.$store.dispatch("fetchTransactions", month);
    },
  },
};
</script>
