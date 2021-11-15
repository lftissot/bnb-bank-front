import { createStore } from "vuex";

import AuthModule from "./auth.module";
import BankingModule from "./banking.module";
import AdminModule from "./admin.module";

export default createStore({
  modules: { auth: AuthModule, admin: AdminModule, banking: BankingModule },
});
