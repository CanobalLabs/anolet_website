<template>
<v-card theme="light" class="fill-height">
    <div class="chiparea-left" v-if="item.manager == this.$root.me.id">
      <v-chip>{{ item.sales }} Sales</v-chip>
    </div>
    <div class="chiparea">
      <v-chip class="spacechip">{{ typeFormat(item.type) }}</v-chip>
      <v-chip color="green">{{
        item.price == 0 ? "Free" : "$" + item.price
      }}</v-chip>
    </div>
    <v-img
      :src="'https://cdn.anolet.com/items/' + item.id + '/preview.png'"
      class="itemImage"
      height="200"
    ></v-img>
    <v-list-item class="w-100">
      <template v-slot:prepend>
        <v-avatar
          :image="
            'https://staging-api-infra.anolet.com/user/' +
            item.manager +
            '/avatar'
          "
          rounded="0"
        ></v-avatar>
      </template>

      <v-list-item-title>{{ item.name }}</v-list-item-title>

      <template v-if="item.owner != item.manager">
        <v-list-item-subtitle
          >designed by <b>{{ item.manager }}</b></v-list-item-subtitle
        >
        <v-list-item-subtitle
          >sold by <b>{{ item.owner }}</b></v-list-item-subtitle
        >
      </template>
      <template v-if="item.owner == item.manager">
        <v-list-item-subtitle
          >designed & sold by
          <b>{{ item.owner }}</b></v-list-item-subtitle
        >
      </template>
    </v-list-item>
    <v-card-item>
      <v-card-description v-text="item.description"></v-card-description>
    </v-card-item>

    <v-card-actions>
      <v-spacer></v-spacer>
      <template
        v-if="
          this.$root.me && !this.$root.me.belongings.includes(item.id)
        "
      >
        <v-btn
          class="fakebtn"
          disabled
          color="blue"
          flat
          prepend-icon="mdi-cash"
          variant="flat"
        >
          Purchase
        </v-btn>

        <v-btn
          class="realbtn"
          @click="purchase(item.id)"
          :disabled="item.available == false"
          color="blue"
          flat
          prepend-icon="mdi-cash"
          variant="flat"
        >
          Purchase
        </v-btn>
      </template>
      <template
        v-if="this.$root.me && this.$root.me.belongings.includes(item.id)"
      >
        <v-btn class="fakebtn" variant="outlined" color="red">
          Owned
        </v-btn>

        <v-btn class="realbtn" variant="outlined" color="red">
          Owned
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
  </template>

  <script>
import axios from "axios";

export default {
  name: "Store",
  props: {
    item: Object
  },
  methods: {
    purchase(id) {
      axios
        .post(
          "https://staging-api-infra.anolet.com/item/" + id + "/purchase",
          undefined,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.ANALTOK,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$root.me.belongings.push(id);
            this.$root.startToast("Purchased item", "green", 4000);
            // this.$root.me.amulets = 0
          }
        });
    },
    typeFormat(type) {
      return type.replace(/^./, type[0].toUpperCase());
    },
  },
};
</script>