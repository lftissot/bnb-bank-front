<template>
  <el-card body-style="padding: 0px;">
    <TitleDatePicker title="Check Details" :hide-picker="true" />
    <TransactionDetail
      icon="user"
      title="CUSTOMER"
      :value="transaction.user.username"
    />
    <TransactionDetail
      icon="envelope"
      title="CUSTOMER EMAIL"
      :value="transaction.user.email"
    />
    <TransactionDetail
      icon="file"
      title="ACCOUNT"
      :value="transaction.user.id"
    />
    <TransactionDetail
      icon="money-bill"
      title="REPORTED AMOUNT"
      :value="formatAmount(transaction.amount)"
    />
    <img :src="transaction.check.path" class="check-preview" />
    <div class="details">
      <el-button @click="deny"
        ><font-awesome-icon icon="times-circle" /> REJECT</el-button
      >
      <el-button type="primary" @click="approve"
        ><font-awesome-icon icon="check-circle" /> ACCEPT</el-button
      >
    </div>
  </el-card>
</template>

<script>
import TransactionService from "@/services/transaction.svc";
import { ElCard, ElButton, ElMessage } from "element-plus";
import TitleDatePicker from "@/components/TitleDatePicker";
import TransactionDetail from "@/components/TransactionDetail";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    ElCard,
    ElButton,
    TitleDatePicker,
    TransactionDetail,
    FontAwesomeIcon,
  },
  name: "IncomeDetails",
  data() {
    return {
      transaction: null,
    };
  },
  beforeMount() {
    this.transaction = this.$store.state.admin.pendingChecks.find(
      (pendingCheck) => pendingCheck.id == this.$route.params.id
    );
  },
  methods: {
    approve() {
      TransactionService.updateTransactionStatus(this.transaction, 1)
        .then(() => {
          ElMessage.success({
            message: "Check successfully approved!",
            duration: 5000,
          });
          this.$router.push("/admin/pending");
        })
        .catch(() => {
          ElMessage.error({
            message: "Oops. Something unexpected went wrong.",
            duration: 5000,
          });
        });
    },
    deny() {
      TransactionService.updateTransactionStatus(this.transaction, 2)
        .then(() => {
          ElMessage.success({
            message: "Check successfully rejected!",
            duration: 5000,
          });
          this.$router.push("/admin/pending");
        })
        .catch(() => {
          ElMessage.error({
            message: "Oops. Something unexpected went wrong.",
            duration: 5000,
          });
        });
    },
    formatAmount(value) {
      return "$" + value.toFixed(2);
    },
  },
};
</script>

<style scoped>
.details {
  padding: 20px;
}

.check-preview {
  max-height: 250px;
  margin-bottom: 20px;
}
</style>
