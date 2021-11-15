<template>
  <el-card body-style="padding: 0px;">
    <TitleDatePicker title="Checks" @dateChanged="handleDateChange" />
    <div class="radio-container">
      <el-radio-group v-model="status" @change="handleStatusChange">
        <el-radio-button label="Pending"></el-radio-button>
        <el-radio-button label="Accepted"></el-radio-button>
        <el-radio-button label="Denied"></el-radio-button>
      </el-radio-group>
    </div>
    <TransactionItem
      :title="income.description"
      :amount="income.amount"
      :description="income.executed_on"
      v-for="income in incomes"
      :key="income.id"
    />
    <EmptyList v-if="!incomes || incomes.length == 0" />
  </el-card>
  <el-button type="primary" size="medium" circle @click="createIncome"
    ><font-awesome-icon icon="plus"
  /></el-button>
</template>

<script>
import { ElCard, ElRadioGroup, ElRadioButton, ElButton } from "element-plus";
import TitleDatePicker from "@/components/TitleDatePicker";
import TransactionItem from "@/components/TransactionItem";
import EmptyList from "@/components/EmptyList";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Incomes",
  components: {
    ElCard,
    ElRadioGroup,
    ElRadioButton,
    TitleDatePicker,
    ElButton,
    TransactionItem,
    FontAwesomeIcon,
    EmptyList,
  },
  data() {
    return {
      status: "Pending",
      date: null,
    };
  },
  methods: {
    handleStatusChange() {
      this.$store.dispatch("fetchIncomes", {
        date: this.date,
        status: this.convertStatusToNumeric(this.status),
      });
    },
    handleDateChange(date) {
      if (date) this.date = date;
      this.$store.dispatch("fetchIncomes", {
        date: this.date,
        status: this.convertStatusToNumeric(this.status),
      });
    },
    convertStatusToNumeric() {
      return ["Pending", "Accepted", "Denied"].indexOf(this.status);
    },
    createIncome() {
      this.$router.push("/banking/incomes/new");
    },
  },
  computed: {
    incomes() {
      return this.$store.state.banking.incomes;
    },
  },
  mounted() {
    this.$store.dispatch("fetchIncomes", {
      date: null,
      status: this.convertStatusToNumeric(0),
    });
  },
};
</script>

<style scoped>
.radio-container {
  padding: 30px;
}

.el-button.is-circle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
}
</style>
