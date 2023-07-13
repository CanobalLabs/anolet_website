<template>
  <v-dialog v-model="this.$root.dialogs.login">
    <v-card width="350px">
      <v-card-title class="text-center text-bold">Join the fun</v-card-title>
      <v-card-text>
        <v-text-field v-model="auth" label="Email" required min="3" max="20" variant="solo-filled"></v-text-field>
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
    auth: "",
  }),
};
</script>