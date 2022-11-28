<template>
    <v-dialog v-model="this.$root.dialogs.accountSettings" v-if="this.$root.me">
        <v-card width="600px">
            <v-card-title>Settings for {{ this.$root.me.username }}</v-card-title>
            <v-card-text>
                <v-alert type="warning" v-if="!this.$root.me.email">Your account does not have an email associated with
                    it. Remember to do this as soon as possible in case anything happens to your account!</v-alert>

                <v-text-field v-model="this.$root.me.email" label="Email" type="email">
                    <template v-slot:append>
                        <v-btn color="blue darken-1" text @click="saveEmail()">
                            Save
                        </v-btn>
                    </template>
                    <template v-slot:prepend>
                        <v-icon v-if="this.$root.me.emailVerified" icon="mdi-check-decagram" color="green"></v-icon>
                        <v-icon v-else icon="mdi-alert-octagon" color="yellow"></v-icon>
                    </template>
                </v-text-field>
                <v-text-field v-model="this.$root.me.username" label="Username">
                    <template v-slot:append>
                        <v-btn color="blue darken-1" text @click="saveName()">
                            Save
                        </v-btn>
                    </template>
                </v-text-field>
            </v-card-text>

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
            axios.post("https://api-staging.anolet.com/user/me/email/", {
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
                    this.$root.dialogs.accountSettings = false;
                    this.$root.refresh();
                }
            })
        },
        saveName() {
            axios.post("https://api-staging.anolet.com/user/me/", {
                username: this.$root.me.username
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
                    this.$root.refresh();
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

    }),
};
</script>