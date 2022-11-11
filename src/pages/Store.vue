<template>
  <v-container fluid>
    <v-row dense>
    <template v-for="item in items" :key="item.id">
     <v-col cols="4">
           
        <v-card>
<v-img
      :src="'https://cdn.anolet.com/' + item.assetURL"
      height="100px"
      cover
    ></v-img>
          <v-card-item>
            <v-card-title>{{ item.title }}</v-card-title>
            <template v-if="item.owner != item.manager">
                 <v-card-subtitle>designed by <b>{{ item.manager }}</b></v-card-subtitle>
                 <v-card-subtitle>sold by <b>{{ item.owner }}</b></v-card-subtitle>
            </template>
            <template v-if="item.owner == item.manager">
                 <v-card-subtitle>designed & sold by <b>{{ item.owner }}</b></v-card-subtitle>
            </template>
            <v-card-description v-text="item.description"></v-card-description>
          </v-card-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="(!this.$root.me) || (this.$root.me && !this.$root.me.belongings[item.type][item.id])" @click="purchase(item.id)" :disabled="(item.available == false) || !this.$root.me" color="blue" flat prepend-icon="mdi-cash" variant="flat">
            Purchase (tbd)
            </v-btn>
            <v-btn v-if="this.$root.me && this.$root.me.belongings[item.type][item.id]" variant="outlined" disabled>
            Owned
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Store",

  data: () => ({
    items: [],
  }),
  methods: {
    purchase(id) {
      // tbd
    },
  },
  created: function () {
    axios
      .get("https://staging-api-infra.anolet.com/item/s", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK,
        },
      })
      .then((res) => {
        if (res.data != "Unauthorized") {
          this.items = res.data;
        }
      });
  },
};
</script>
