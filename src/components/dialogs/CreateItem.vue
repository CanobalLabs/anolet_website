<template>
  <v-dialog v-model="this.$root.dialogs.createItem">
    <v-card width="300px">
      <v-card-title>Create an item</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" label="Name" required min="3" max="255"></v-text-field>
        <v-textarea v-model="description" label="Description" required></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$root.dialogs.signup = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submitSignup(username, password)">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreateItem",
  methods: {
  },
  data: () => ({
    username: "",
    password: ""
  }),
};
</script>