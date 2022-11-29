<template>
  <v-dialog v-model="this.$root.dialogs.accountSettings">
    <v-card width="500">
      <v-card-title>User Settings</v-card-title>

      <div class="d-flex flex-row">

        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab v-for="tab in tabs" :key="tab.id" :value="tab.id">
            <v-icon start>
              {{ tab.icon }}
            </v-icon>
            {{ tab.name }}
          </v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="general">
            <v-card flat width="373">
              <v-card-text>
                <v-text-field v-model="this.$root.me2.email" label="Email" type="email" variant="outlined">
                  <template v-slot:prepend>
                    <v-icon v-if="this.$root.me2.emailVerified" icon="mdi-check-decagram" color="green"></v-icon>
                    <v-icon v-else icon="mdi-alert-octagon" color="yellow"></v-icon>
                  </template>
                </v-text-field>
                <v-text-field v-model="this.$root.me2.username" label="Username" variant="outlined">
                </v-text-field>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item value="about">
            <v-card flat width="373">
              <v-card-text class="text-center">
                Website Version - 3fb811 <br>
                API Base URL - {{ this.$root.baseURL }} <br>
                CDN URL - {{ this.$root.cdnURL }}
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>

      <v-card-actions>
        <v-btn color="red darken-1" variant="flat" @click="logOut()">
          Log Out
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$root.dialogs.accountSettings = false">
          Close
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {

  name: "AccountSettings",
  created: () => {

  },
  methods: {
    saveEmail() {
      axios.post(this.$root.baseURL + "/user/me/email/", {
        email: this.$root.me2.email
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          }
        }
      ).then(res => {
        if (res.status == 200) {
          this.$root.dialogs.accountSettings = false;
          this.$root.me.email = this.$root.me2.email
        }
      })
    },
    saveName() {
      axios.post(this.$root.baseURL + "/user/me/", {
        username: this.$root.me2.username
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          }
        }
      ).then(res => {
        if (res.status == 200) {
          this.$root.dialogs.accountSettings = false;
          this.$root.me.username = this.$root.me2.username;
        }
      })
    },
    logOut() {
      this.$root.dialogs.accountSettings = false
      localStorage.removeItem("ANALTOK");
      this.$root.me = null;
    }
  },
  data: () => ({
    tab: "general",
    tabs: [
      {
        icon: "mdi-account",
        name: "General",
        id: 'general'
      },
      {
        icon: "mdi-lock",
        name: "Security",
        id: 'security'
      },
      {
        icon: "mdi-eye-off",
        name: "Privacy",
        id: 'privacy'
      },
      {
        icon: "mdi-information",
        name: "About",
        id: 'about'
      }
    ]
  }),
};
</script>