<template>
  <el-card body-style="padding: 0px;">
    <BalanceMeter color="#1e88e5" title="Current balance" :amount="balance" />

    <el-form @submit="handleCreation" :model="form" :rules="rules">
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
      <el-form-item prop="description" label="Description">
        <el-input
          type="text"
          placeholder="description"
          label="Description"
          name="description"
          v-model="form.description"
        />
      </el-form-item>

      <!-- TODO: Extract to FileUpload component -->
      <div class="upload-area clickable" v-if="!img" @click="openUpload">
        <font-awesome-icon class="icon" icon="cloud-upload-alt" />
        <span>UPLOAD CHECK PICTURE</span>
      </div>
      <input
        type="file"
        ref="file"
        placeholder="file"
        name="file"
        @change="handleImageChange($event)"
        style="display: none"
        id="file-picker"
      />
      <img class="check-preview" :src="img" v-if="img != null" />
      <!-- TODO: Extract to FileUpload component -->

      <div>
        <el-button type="primary" @click="handleCreation"
          >DEPOSIT CHECK</el-button
        >
      </div>
    </el-form>
  </el-card>
</template>

<script>
import TransactionService from "@/services/transaction.svc";
import BalanceMeter from "@/components/BalanceMeter";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  ElForm,
  ElButton,
  ElFormItem,
  ElInput,
  ElCard,
  ElInputNumber,
  ElMessage,
} from "element-plus";

export default {
  name: "IncomesForm",
  components: {
    BalanceMeter,
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
    ElCard,
    ElInputNumber,
    FontAwesomeIcon,
  },
  computed: {
    balance() {
      return this.$store.state.banking.balance.balance;
    },
  },
  data() {
    const form = {
      amount: 0.0,
      description: null,
      file: null,
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
    };

    return {
      form,
      rules,
      img: null,
      file: null,
    };
  },
  methods: {
    async handleCreation() {
      let income = this.form;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("amount", income.amount);
      formData.append("description", income.description);
      TransactionService.addIncome(formData)
        .then(() => {
          ElMessage.success({
            message: "Check successfully registered!",
            duration: 5000,
          });
          this.$router.push("/banking/incomes");
        })
        .catch(() => {
          ElMessage.error({
            message: "Oops. Something unexpected went wrong.",
            duration: 5000,
          });
        });
    },
    isFileValid(file) {
      if (file.type.indexOf("image") !== 0) return false;

      return true;
    },
    async handleImageChange(e) {
      let file = e.target.files[0];
      if (this.isFileValid(file)) {
        this.file = file;
        this.img = URL.createObjectURL(this.file);
      } else {
        ElMessage({
          message: "The file must be an image",
          type: "error",
          duration: 5000,
        });
      }
    },
    openUpload() {
      document.getElementById("file-picker").click();
    },
  },
};
</script>

<style scoped>
form {
  padding: 20px;
  text-align: left;
}

.upload-area {
  border: 3px dashed #ddd;
  height: 150px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 12px;
}

.icon {
  font-size: 36px;
  color: #ddd;
  margin-bottom: 10px;
}

.clickable {
  cursor: pointer;
}

.check-preview {
  max-height: 250px;
  margin-bottom: 20px;
}
</style>
