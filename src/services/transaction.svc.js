import axios from "axios";

import store from "@/store/index";

const URL = "/api";

class TransactionService {
  getBalance() {
    return axios.get(URL + "/me", {
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  async getTransactions(params) {
    return axios.get(URL + "/transactions", {
      params: params,
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  getExpenses(params) {
    return axios.get(URL + "/expenses", {
      params: params,
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  addExpense(expense) {
    return axios.post(URL + "/expenses", expense, {
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  getIncomes(params) {
    return axios.get(URL + "/incomes", {
      params: params,
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  addIncome(income) {
    return axios.post(URL + "/incomes", income, {
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getPendingTransactions(params) {
    return axios.get(URL + "/adm/pendingIncomes", {
      params: params,
      headers: {
        Authorization: `Bearer ${store.state.auth.token}`,
      },
    });
  }

  updateTransactionStatus(transaction, status) {
    transaction.status = status;
    return axios.patch(
      URL + "/adm/pendingIncomes/" + transaction.id,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${store.state.auth.token}`,
        },
      }
    );
  }
}

export default new TransactionService();
