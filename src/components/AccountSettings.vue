<template>
  <v-dialog v-model="this.$root.dialogs.accountSettings">
    <v-card width="600px">
      <v-card-title>Settings for {{ this.$root.me.username }}</v-card-title>
      <v-card-text>
        <v-alert type="warning" v-if="!this.$root.me.email">Your account does not have an email associated with it. Remember to do this as soon as possible in case anything happens to your account!</v-alert>
      
        <v-text-field v-model="this.$root.me.email" label="Email" type="email" required></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="save()"
        >
          Save
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="this.$root.dialogs.accountSettings = false"
        >
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
    save() {
        axios.post("https://staging-api-infra.anolet.com/user/user/me/email/", {
            email: this.$root.me.email
        }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.ANALTOK,
                }
            }
            ).then(res => {
            if (res.status == 200) {
                window.location.reload();
            }
        })
    }
  },
  data: () => ({
    
  }),
};
</script>