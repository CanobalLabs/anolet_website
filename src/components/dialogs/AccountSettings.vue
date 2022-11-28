<template>
    <v-dialog v-model="this.$root.dialogs.accountSettings">
        <v-card width="300px">
            <v-card-title>User Settings</v-card-title>
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
            axios.post("https://api-staging.anolet.com/user/me/", {
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

    }),
};
</script>