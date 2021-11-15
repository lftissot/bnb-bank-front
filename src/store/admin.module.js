import TransactionService from "@/services/transaction.svc";

const adminModule = {
  state: {
    pendingChecks: [],
  },
  mutations: {
    setPendingChecks(state, checks) {
      state.pendingChecks = checks;
    },
  },
  actions: {
    fetchPendingChecks({ commit }, date) {
      let requestParams = {};
      if (date) {
        requestParams = {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      }

      TransactionService.getPendingTransactions(requestParams).then((r) => {
        commit("setPendingChecks", r.data);
      });
    },
  },
};

export default adminModule;
