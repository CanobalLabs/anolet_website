<template>
<v-card theme="light" class="fill-height">
    <div class="chiparea-left">
      <v-chip v-if="item.manager == this.$root.me.id">{{ item.sales }} Sale<template v-if="sales != 1">s</template></v-chip>
      <template v-if="new Date(item.saleEnd) >= new Date()">
      <v-chip :class="item.manager == this.$root.me.id ? 'spacechip' : ''" color="red">{{ 100 - ((item.salePrice * 100) / item.price) }}% off</v-chip>
        <v-chip color="blue" class="spacechip">
            <v-icon start icon="mdi-clock"></v-icon>
            {{ humanizeDuration(Interval.fromDateTimes(DateTime.now(), DateTime.fromISO(item.saleEnd)).toDuration().valueOf(), { largest: 1, round: true }) }}
        </v-chip>
      </template>
    </div>
    <div class="chiparea">
      <v-chip color="green">
        {{ (new Date(item.saleEnd) >= new Date()) ? (item.salePrice == 0 ? "Free" : "$" + item.salePrice) : (item.price == 0 ? "Free" : "$" + item.price) }}</v-chip>
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

      <v-list-item-title class="font-weight-bold">{{ item.name }} <v-chip
      class="mx-0"
      size="x-small"
    >
    {{ typeFormat(item.type) }}
    </v-chip></v-list-item-title>

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
import { DateTime, Interval } from "luxon";
import humanizeDuration from "humanize-duration";

export default {
  name: "Store",
  props: {
    item: Object
  },
  data: () => ({
    DateTime: DateTime,
    Interval: Interval,
    humanizeDuration: humanizeDuration
  }),
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
            if (new Date(item.saleEnd) >= new Date()) {
                // On sale
                this.$root.me.amulets = this.item.salePrice
            } else {
                this.$root.me.amulets = this.item.price
            }
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
