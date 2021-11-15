<template>
  <div class="transaction-container">
    <span class="title" v-if="title">{{ title }}</span>
    <el-date-picker
      v-model="month"
      type="month"
      placeholder="Filter by month"
      @change="handleDateChange"
      v-if="!hidePicker"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { ElDatePicker } from "element-plus";

export default {
  name: "TitleDatePicker",
  components: {
    ElDatePicker,
  },
  props: {
    title: String,
    hidePicker: Boolean,
  },
  methods: {
    handleDateChange() {
      this.$emit("dateChanged", this.month);
    },
  },
  data() {
    return {
      month: null,
    };
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
  align-items: center;
  border-bottom: 1px solid #eee;
}

.title {
  color: #666;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  vertical-align: middle;
}

svg {
  position: relative;
  bottom: 20px;
}
</style>
