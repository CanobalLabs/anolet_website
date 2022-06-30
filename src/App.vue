<template>
  <v-app>
    <Sidebar />
    <v-main style="margin: 16px;">
      <v-alert type="warning" v-if="!this.$root.me.email">Your account does not have an email associated with it. Remember to do this as soon as possible in case anything happens to your account!</v-alert>
      <router-view></router-view>
      <Login></Login>
      <Signup></Signup>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import axios from "axios";
var me = null;

export default {
  name: "App",

  components: {
    Sidebar,
    Login,
    Signup,
  },

  data: () => ({
    me: null,
    dialogs: {
      login: false,
      signup: false,
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
};

</script>
