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
  <iframe src="" id="player" frameBorder="0"></iframe>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import AccountSettings from "./components/AccountSettings.vue";

import axios from "axios";
var me = null;

function handleDisconnect(event) {
   if (event.data == "disconnect") {
      document.getElementById("player").style.opacity = "0";
      setTimeout(function() {
      document.getElementById("player").style.display = "none";
      }, 800);
      document.getElementById("player").src = "";
      document.exitFullscreen()
   }
}
window.addEventListener("message", handleDisconnect, false);

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
