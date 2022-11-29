<template>
  <v-dialog v-model="this.$root.dialogs.login">
    <v-card width="300px">
      <v-card-title>Login to your account</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Username" required min="3" max="20"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$root.dialogs.login = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submitLogin(username, password)">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  methods: {
    submitLogin(username, password) {
      axios.post(this.$root.baseURL + "/login/", {
        username, password
      }).then(res => {
        if (res.status == 200) {
          localStorage.setItem("ANALTOK", res.data.token);
          this.$root.refresh();
          this.$root.dialogs.login = false;
        }
      })
    },
  },
  data: () => ({
    username: "",
    password: ""
  }),
};
</script>