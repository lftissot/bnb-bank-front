<template>
  <el-card body-style="padding: 0px;">
    <BalanceMeter color="#1e88e5" title="Current balance" :amount="balance" />
    <el-form
      @submit="handleCreation"
      :rules="rules"
      :model="form"
      ref="form"
      v-if="balance != undefined"
      label-position="top"
    >
      <el-form-item prop="amount" label="Amount">
        <el-input-number
          type="number"
          label="amount"
          placeholder="amount"
          :step="0.01"
          :min="0.01"
          :precision="2"
          name="amount"
          v-model.float="form.amount"
          width="200px"
        />
      </el-form-item>
      <el-form-item prop="executed_on" label="Date">
        <el-date-picker
          type="date"
          name="executed_on"
          v-model="form.executed_on"
        />
      </el-form-item>
      <el-form-item prop="description" label="Description">
        <el-input
          type="text"
          placeholder="description"
          label="Description"
          name="description"
          v-model="form.description"
        />
      </el-form-item>
      <el-button type="primary" @click="handleCreation">ADD PURCHASE</el-button>
    </el-form>
  </el-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import TransactionService from "@/services/transaction.svc";

import {
  ElForm,
  ElButton,
  ElFormItem,
  ElInput,
  ElCard,
  ElDatePicker,
  ElInputNumber,
  ElMessage,
  // ElRow,
  // ElCol,
} from "element-plus";

import BalanceMeter from "@/components/BalanceMeter";

export default {
  name: "ExpensesForm",
  components: {
    BalanceMeter,
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
    ElCard,
    ElDatePicker,
    ElInputNumber,
    // ElRow,
    // ElCol,
  },
  computed: {
    balance() {
      return this.$store.state.banking.balance.balance;
    },
  },
  data() {
    const form = {
      amount: 0.0,
      executed_on: null,
      description: null,
    };

    const rules = {
      amount: [
        {
          required: true,
          message: "Amount is required",
          trigger: "blur",
        },
        {
          type: "number",
          message: "Please enter a valid amount",
          trigger: "blur",
        },
      ],
      executed_on: [
        {
          required: true,
          message: "Date is required",
          trigger: "blur",
        },
      ],
    };

    return {
      form,
      rules,
    };
  },
  methods: {
    async handleCreation() {
      this.$refs["form"].validate(async (valid) => {
        if (!valid) return;
        this.form.amount = this.form.amount * -1;
        TransactionService.addExpense(this.form)
          .then(() => {
            ElMessage.success({
              message: "Expense successfully registered!",
              "show-close": true,
              duration: 2000,
            });
            this.$router.push("/banking/expenses");
          })
          .catch(() => {
            ElMessage.error({
              message: "Oops. Something unexpected went wrong.",
              "show-close": true,
              duration: 5000,
            });
          });
      });
    },
  },
  mounted() {
    this.rules.amount.push({
      type: "number",
      min: 0.01,
      max: parseFloat(this.balance),
      message: "Insuficient funds",
    });
  },
};
</script>

<style scoped>
form {
  padding: 20px;
  text-align: left;
}
</style>
