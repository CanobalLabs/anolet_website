<template>
    <v-row dense>
      <v-col cols="3">
        <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list selected="1">
      <v-list-item
        v-for="(item, i) in tabs"
        :key="i"
        :value="item.value"
        active-color="primary"
        :to="item.to"
        @click="relistItems(item.filter)"
      >
        <template v-slot:prepend v-if="item.icon">
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
      </v-col>
    <template v-for="item in items" :key="item.id">
     <v-col cols="3">
           
        <v-card theme="light" class="fill-height">
<v-img
      :src="'https://cdn.anolet.com/' + item.previewURL"
      class="itemImage"
      height="200"
      
    ></v-img>
          <v-card-item>
            <v-card-title>{{ item.name }}<div class="chiparea"><v-chip class="spacechip">{{ typeFormat(item.type) }}</v-chip><v-chip color="green">{{ item.price == 0 ? "Free" : "$" + item.price }}</v-chip></div></v-card-title>
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
            <v-btn v-if="this.$root.me && !this.$root.me.belongings.hats.concat(this.$root.me.belongings.bodies, this.$root.me.belongings.faces, this.$root.me.belongings.shoes).includes(item.id)" @click="purchase(item.id)" :disabled="item.available == false" color="blue" flat prepend-icon="mdi-cash" variant="flat">
            Purchase (tbd)
            </v-btn>
            <v-btn v-if="this.$root.me && this.$root.me.belongings.hats.concat(this.$root.me.belongings.bodies, this.$root.me.belongings.faces, this.$root.me.belongings.shoes).includes(item.id)" variant="outlined" color="red">
            Owned
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "Store",

  data: () => ({
    items: [],
    tabs: [
      {
        title: "All",
        to: "/store/",
        filter: ""
      },
      {
        title: "Hats",
        to: "/store/hats",
        filter: "hat"
      },
      {
        title: "Bodies",
        value: 3,
        to: "/store/bodies",
        filter: "body"
      },
      {
        title: "Faces",
        value: 4,
        to: "/store/faces",
        filter: "face"
      },
      {
        title: "Shoes",
        value: 5,
        to: "/store/shoes",
        filter: "shoes"
      }
    ]
  }),
  methods: {
    purchase(id) {
      axios
      .post("https://staging-api-infra.anolet.com/item/" + id + "/purchase", undefined, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK
        },
      })
      .then((res) => {
        if (res.data != "Unauthorized") {
        //  this.items = res.data;
        }
      });
    },
    typeFormat(type) {
      return type.replace(/^./, type[0].toUpperCase());
    },
    relistItems(filter) {
      axios
      .get("https://staging-api-infra.anolet.com/item/s", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK,
          "x-anolet-filter": filter
        },
      })
      .then((res) => {
        if (res.data != "Unauthorized") {
          this.items = res.data;
        }
      });
    }
  },
  created: function () {
    var filterType = "";
    switch (window.location.pathname) {
      case "/store/hats":
        filterType = "hat"
        break;
      case "/store/bodies":
        filterType = "body"
        break;
      case "/store/faces":
        filterType = "face"
        break;
      case "/store/shoes":
        filterType = "shoes"
        break;
    }
    axios
      .get("https://staging-api-infra.anolet.com/item/s", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK,
          "x-anolet-filter": filterType
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
