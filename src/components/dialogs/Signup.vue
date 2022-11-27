<template>
  <v-dialog v-model="this.$root.dialogs.signup">
    <v-card width="300px">
      <v-card-title>Sign up to join the fun!</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Username" required min="3" max="20"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$root.dialogs.signup = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submitSignup(username, password)">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: "Signup",
  methods: {
    submitSignup(username, password) {
      axios.post("https://api-staging.anolet.com/login/signup", {
        username, password
      }).then(res => {
        if (res.status == 200) {
          localStorage.setItem("ANALTOK", res.data.token);
          window.location.reload();
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