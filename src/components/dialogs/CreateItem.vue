<template>
  <v-dialog v-model="this.$root.dialogs.createItem">
    <v-card width="300px">
      <v-card-title>Draft an item</v-card-title>
      <v-card-text>
        <v-switch
          v-if="this.$root.permissions.includes('UPLOAD_ANOLET') && this.$root.permissions.includes('UPLOAD_SELF')"
          inset color="primary" label='Publish as website' v-model="anoletAccount" class="input"></v-switch>
        <v-select variant="outlined" label="Type" v-model="type" class="input"
          :items="[{ title: 'Accessory', value: 'accessory' }, { title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }, { title: 'Shoes', value: 'shoes' }]">
        </v-select>
        <v-text-field class="input" variant="outlined" v-model="name" label="Name" required min="1" max="255">
        </v-text-field>
        <v-textarea class="input" variant="outlined" v-model="description" label="Description" max-rows="6">
        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="this.$root.dialogs.signup = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="createItem()">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreateItem",
  data: () => ({
    type: "",
    name: "",
    description: "",
    anoletAccount: false,
  }),
  methods: {
    createItem() {
      axios.post(this.$root.baseURL + "/item/", {
        type: this.type,
        name: this.name,
        description: this.description,
        anoletAccount: this.$root.permissions.includes('UPLOAD_ANOLET') && this.$root.permissions.includes('UPLOAD_SELF') ? this.anoletAccount : (this.$root.permissions.includes('UPLOAD_ANOLET') ? true : false)
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          },
        }).then(res => {
          if (res.status == 200) {
            this.$root.startToast("Item created", "green", 3000);
            this.$root.dialogs.createItem = false;
            this.$router.push("/store/my-creations")
          }
        })
    }
  }
};
</script>