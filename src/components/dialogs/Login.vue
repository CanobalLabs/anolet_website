<template>
  <v-dialog v-model="this.$root.dialogs.login">
    <v-card width="500px" title="Join the fun">
      <template v-slot:append>
        <div class="me-n2">
          <v-btn v-if="auth_state == 'email'" color="blue darken-1" text append-icon="mdi-chevron-right" variant="plain"
            @click="submitAuth(auth)">
            Next
          </v-btn>
          <v-btn v-if="auth_state == '2fa' && code?.length == 6" color="blue darken-1" text variant="plain"
            @click="submitCode(auth, code)">
            Login
          </v-btn>
        </div>
      </template>
      <v-card-text>
        <v-alert color="#2196f3" class="mbottom10" v-if="auth_state == '2fa'">We sent a 6-digit verfication code to <b>{{ auth }}</b>. If you don't see it, try checking your spam folder.</v-alert>
        <v-text-field v-if="auth_state == 'email'" v-model="auth" label="Email" required min="3" max="20" variant="solo-filled"></v-text-field>
        <v-text-field v-if="auth_state == '2fa'" v-model="code" label="Authentication Code" required min="6" max="6" variant="solo-filled" transition="fade-transition" prepend-inner-icon="mdi-two-factor-authentication"></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  methods: {
    submitAuth(auth) {
      axios.post(this.$root.baseURL + "/canobalLabs/login/sendLoginCode", {
        auth, vendor: "anolet"
      }).then(res => {
        if (res.status == 200) {
          this.auth_state = "2fa"
        }
      })
    },
    submitCode(auth, code) {
      axios.post(this.$root.baseURL + "/canobalLabs/login/" + code, {
        auth, vendor: "anolet"
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
    code: "",
    auth_state: "email",
  }),
};
</script>