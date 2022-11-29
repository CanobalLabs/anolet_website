<template>
  <v-row dense>
    <v-col cols="3">
      <v-text-field label="Search" clearable variant="outlined" class="searchBar mx-auto" v-model="search"
        @input="(search.length >= 3 || search.length == 0) && relistItems()"></v-text-field>
      <v-card class="mx-auto">
        <v-list selected="1">
          <v-list-item v-for="(item, i) in tabs" :key="i" :value="item.value" active-color="primary" :to="item.to"
            :disabled="item.disabled" @click="
  filter = item.filter;
relistItems();
            ">
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>

          <v-list-item active-color="primary" to="/store/my-creations" @click="filter = 'my-creations'; relistItems();"
            v-if="this.$root.permissions?.includes('UPLOAD_SELF') || this.$root.permissions?.includes('UPLOAD_ANOLET')">
            <v-list-item-title>My Creations</v-list-item-title>
          </v-list-item>
          <v-list-item active-color="primary" disabled v-else>
            <v-list-item-title>Apply for UGC</v-list-item-title>
            <v-list-item-subtitle>UGC Applications are paused.</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <template v-for="item in items" :key="item.id">
      <v-col cols="3">
        <Item :item="item"></Item>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import axios from "axios";
import Item from "../components/Item.vue";

export default {
  name: "Store",

  data: () => ({
    items: [],
    filter: "",
    search: "",
    tabs: [
      {
        title: "All",
        to: "/store/",
        filter: "",
      },
      {
        title: "Accessories",
        to: "/store/accessories",
        filter: "accessory",
      },
      {
        title: "Bodies",
        to: "/store/bodies",
        filter: "body",
      },
      {
        title: "Faces",
        to: "/store/faces",
        filter: "face",
      },
      {
        title: "Shoes",
        to: "/store/shoes",
        filter: "shoes",
      },
    ],
  }),
  methods: {
    relistItems() {
      axios
        .get(this.$root.baseURL + "/item/s", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
            "x-anolet-filter": this.filter,
            "x-anolet-search": this.search,
          },
        })
        .then((res) => {
          if (res.data != "Unauthorized") {
            this.items = res.data;
            twemoji.parse(document.body);
          }
        });
    },
  },
  created: function () {
    let filterType = "";
    switch (window.location.pathname) {
      case "/store/accessories":
        filterType = "accessory";
        break;
      case "/store/bodies":
        filterType = "body";
        break;
      case "/store/faces":
        filterType = "face";
        break;
      case "/store/shoes":
        filterType = "shoes";
        break;
      case "/store/my-creations":
        filterType = "my-creations";
        break;
    }
    this.filter = filterType;
    axios
      .get(this.$root.baseURL + "/item/s", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK,
          "x-anolet-filter": this.filter,
        },
      })
      .then((res) => {
          this.items = res.data;
          twemoji.parse(document.body);
      });
  },
  components: {
    Item,
  },
};
</script>
