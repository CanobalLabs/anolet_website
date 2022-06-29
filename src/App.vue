<template>
  <v-app>
    <Sidebar />
    <v-main><router-view></router-view><Login></Login><Signup></Signup></v-main>
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
