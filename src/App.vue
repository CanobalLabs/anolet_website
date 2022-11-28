<template>
  <v-app>
    <Sidebar></Sidebar>
    <v-main style="margin: 16px">
      <Alerts></Alerts>
      <router-view></router-view>
      <Login></Login>
      <Signup></Signup>
      <AccountSettings></AccountSettings>
      <ManageGames></ManageGames>
      <CreateItem></CreateItem>

      <v-snackbar v-model="toast.active" :color="toast.color" :timeout="toast.timeout" location="top-right">
        {{ toast.text }}
      </v-snackbar>
    </v-main>
  </v-app>
  <div id="playerbg"><iframe src="https://client.anolet.com/loading.html" id="player" frameBorder="0"></iframe></div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Login from "./components/dialogs/Login.vue";
import Signup from "./components/dialogs/Signup.vue";
import AccountSettings from "./components/dialogs/AccountSettings.vue";
import ManageGames from "./components/dialogs/ManageGames.vue";
import CreateItem from "./components/dialogs/CreateItem.vue";
import Alerts from "./components/Alerts.vue";

import axios from "axios";

twemoji.parse(document.body)

function handleDisconnect(event) {
  if (event.data == "disconnect") {
    document.getElementById("player").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("player").style.display = "none";
    }, 800);
    document.getElementById("player").src = "https://client.anolet.com/loading.html";
    document.exitFullscreen();
  }
}
window.addEventListener("message", handleDisconnect, false);

export default {
  name: "App",

  data: () => ({
    me: null,
    permissions: null,
    dialogs: {
      login: false,
      signup: false,
      accountSettings: false,
      manageGames: false,
      createItem: false
    },
    createItemState: "create",
    toast: {
      active: false,
      text: "",
      color: "",
      timeout: 0
    }
  }),
  methods: {
    startToast(text, color, timeout) {
      this.toast.text = text;
      this.toast.color = color
      this.toast.timeout = timeout
      this.toast.active = true;
    },
    refresh() {
      axios
        .get("https://api-staging.anolet.com/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          },
        })
        .then((res) => {
          if (res.data != "Unauthorized") {
            this.me = res.data;
            axios
              .get(
                "https://api-staging.anolet.com/user/" +
                res.data.id +
                "/permissions",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.ANALTOK,
                  },
                }
              )
              .then((res) => {
                this.permissions = res.data;
              });
          }
        });
    }
  },
  created: function () {
    if (localStorage.ANALTOK) {
      axios
        .get("https://api-staging.anolet.com/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          },
        })
        .then((res) => {
          if (res.data != "Unauthorized") {
            this.me = res.data;
            axios
              .get(
                "https://api-staging.anolet.com/user/" +
                res.data.id +
                "/permissions",
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.ANALTOK,
                  },
                }
              )
              .then((res) => {
                this.permissions = res.data;
              });
          }
        });
    }
  },

  components: {
    Sidebar,
    Login,
    Signup,
    AccountSettings,
    ManageGames,
    CreateItem,
    Alerts
  },
};
</script>
