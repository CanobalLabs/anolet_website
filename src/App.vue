<template>
  <v-app>
    <Sidebar />
    <v-main style="margin: 16px;">
      <router-view></router-view>
      <Login></Login>
      <Signup></Signup>
      <AccountSettings></AccountSettings>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import AccountSettings from "./components/AccountSettings.vue";

import axios from "axios";
var me = null;

export default {
  name: "App",

  data: () => ({
    me: null,
    dialogs: {
      login: false,
      signup: false,
      accountSettings: false
    },
  }),
  created: function () {
      if (localStorage.ANALTOK) {
        axios
          .get("https://staging-api-infra.anolet.com/user/me", {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.ANALTOK,
            },
          })
          .then((res) => {
            if (res.data != "Unauthorized") {
              this.me = res.data;
            }
          });
      }
    },

  components: {
    Sidebar,
    Login,
    Signup,
    AccountSettings,
  },
};

</script>
