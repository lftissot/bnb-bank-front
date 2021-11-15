import TransactionService from "@/services/transaction.svc";

const bankingModule = {
  state: {
    balance: {
      current: 0,
      incomes: 0,
      expenses: 0,
    },
    transactions: [],
    expenses: [],
    incomes: [],
  },
  mutations: {
    setBalance(state, balance) {
      state.balance = balance;
    },
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
    setExpenses(state, expenses) {
      state.expenses = expenses;
    },
    setIncomes(state, incomes) {
      state.incomes = incomes;
    },
  },
  actions: {
    fetchBalance({ commit }) {
      TransactionService.getBalance().then((r) => {
        commit("setBalance", r.data);
      });
    },
    fetchTransactions({ commit }, date) {
      let requestParams = {};
      if (date) {
        requestParams = {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }
      TransactionService.getTransactions(requestParams).then((r) => {
        commit("setTransactions", r.data);
      });
    },
    fetchExpenses({ commit }, date) {
      let requestParams = {};
      if (date) {
        requestParams = {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }
      TransactionService.getExpenses(requestParams).then((r) => {
        commit("setExpenses", r.data);
      });
    },
    fetchIncomes({ commit }, data) {
      let { status, date } = data;

      let requestParams = { status: status };
      if (date) {
        requestParams = {
          ...requestParams,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }

      TransactionService.getIncomes(requestParams).then((r) => {
        commit("setIncomes", r.data);
      });
    },
  },
};

export default bankingModule;
