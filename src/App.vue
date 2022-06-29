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
import axios from 'axios'
var me = null;
if (localStorage.ANALTOK) {
axios.get("https://staging-api-infra.anolet.com/user/me", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.ANALTOK
  }
}).then(res => {
  if (res.data != "Unauthorized") {
    console.log(this)
    me = res.data
  }
})
}

export default {
  name: "App",

  components: {
    Sidebar,
    Login,
    Signup
  },

  data: () => ({
    me,
    dialogs: {
      login: false,
      signup: false
    }
  }),
};
</script>
