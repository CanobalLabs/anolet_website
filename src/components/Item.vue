<template>
  <v-card class="fill-height" v-if="!deleted" flat>
    <div class="chiparea-left">
      <v-chip v-if="item.manager == this.$root.me?.id"><template v-if="item.available">{{ item.sales }} Sale<template
            v-if="item.sales != 1">s</template></template><template v-else>Draft</template></v-chip>
      <template v-if="new Date(item.saleEnd) >= new Date()">
        <v-chip :class="item.manager == this.$root.me?.id ? 'spacechip' : ''" color="red">{{ 100 - ((item.salePrice *
            100) / item.price)
        }}% off</v-chip>
        <v-chip color="blue" class="spacechip">
          <v-icon start icon="mdi-clock"></v-icon>
          {{ humanizeDuration(Interval.fromDateTimes(DateTime.now(),
              DateTime.fromISO(item.saleEnd)).toDuration().valueOf(), { largest: 1, round: true })
          }}
        </v-chip>
      </template>
    </div>
    <div class="chiparea">
      <v-chip color="green">
        <Gem v-if="(new Date(item.saleEnd) >= new Date()) ? item.salePrice != 0 : item.price != 0"></Gem>
        {{ (new Date(item.saleEnd) >= new Date()) ? (item.salePrice == 0 ? "Free" : item.salePrice.toLocaleString()) :
            (item.price
              == 0 ? "Free" : item.price.toLocaleString())
        }}
      </v-chip>
    </div>
    <v-img :src="item.assetUploaded ? this.$root.cdnURL + '/items/' + item.id + '/preview.png' : ''" class="itemImage"
      height="200"></v-img>
    <v-btn :loading="pendingUpload" v-if="item.manager == this.$root.me?.id && item.assetUploaded == false"
      class="uploadbtn" @click="upload(item.id)" color="blue" flat prepend-icon="mdi-upload" variant="flat">
      Upload Asset
      <input type="file" style="display: none" :id="'item_asset_' + item.id" accept="image/png" />
    </v-btn>
    <v-list-item class="w-100">
      <template v-slot:prepend>
        <v-avatar :image="
          item.manager != 'anolet' ? this.$root.baseURL + '/user/' +
            item.manager +
            '/avatar/preview' : '/AnoletLogoLarge.png'
        " rounded="0" class="avatarOverflowVisible"></v-avatar>
      </template>

      <v-list-item-title class="font-weight-bold">{{ item.name }} <v-chip class="mx-0" size="x-small">
          {{ typeFormat(item.type) }}
        </v-chip>
      </v-list-item-title>

      <template v-if="item.owner != item.manager">
        <v-list-item-subtitle>designed by <b>{{ item.manager == 'anolet' ? 'Anolet Staff' : item.manager }}</b>
        </v-list-item-subtitle>
        <v-list-item-subtitle>sold by <b>{{ item.owner == 'anolet' ? 'Anolet Staff' : item.owner }}</b>
        </v-list-item-subtitle>
      </template>
      <template v-if="item.owner == item.manager">
        <v-list-item-subtitle>designed & sold by
          <b>{{ item.owner == 'anolet' ? 'Anolet Staff' : item.owner }}</b>
        </v-list-item-subtitle>
      </template>
    </v-list-item>
    <v-card-item>
      <v-card-description>{{ item.description }}</v-card-description>
    </v-card-item>

    <v-card-actions>
      <template v-if="!this.item.available && item.manager == this.$root.me?.id">
        <v-btn class="realbtnleft" @click="delete(item.id)" color="red" flat prepend-icon="mdi-delete" variant="flat">
          Delete
        </v-btn>
      </template>
      <v-spacer></v-spacer>
      <template v-if="this.item.available && this.$root?.me && !this.$root.me?.belongings.includes(item.id) && item.manager != this.$root.me?.id">
        <v-btn class="fakebtn" disabled color="blue" flat prepend-icon="mdi-cash" variant="flat">
          Purchase
        </v-btn>

        <v-btn class="realbtn" @click="purchase(item.id)" color="blue" flat prepend-icon="mdi-cash" variant="flat">
          Purchase
        </v-btn>
      </template>
      <template v-if="item.available && this.$root.me?.belongings.includes(item.id) && item.manager != this.$root.me?.id">
        <v-btn class="fakebtn" variant="outlined" color="red">
          Owned
        </v-btn>

        <v-btn class="realbtn" variant="outlined" color="red">
          Owned
        </v-btn>
      </template>
      <template v-if="item.manager == this.$root.me?.id">
        <v-btn class="fakebtn" disabled color="blue" flat prepend-icon="mdi-pencil" variant="flat">
          Edit
        </v-btn>

        <v-btn class="realbtn" @click="evt.$emit('item_edit', item);" color="blue" flat prepend-icon="mdi-pencil" variant="flat">
          Edit
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { DateTime, Interval } from "luxon";
import humanizeDuration from "humanize-duration";
import Gem from "./Gem.vue";
import evt from '../utilities/eventBus.js'

export default {
  name: "Store",
  props: {
    item: Object
  },
  components: {
    Gem
  },
  data: () => ({
    DateTime: DateTime,
    Interval: Interval,
    humanizeDuration: humanizeDuration,
    pendingUpload: false,
    evt: evt,
    deleted: false
  }),
  methods: {
    upload(id) {
      document.getElementById("item_asset_" + id).click();
      if (document.getElementById("item_asset_" + id).getAttribute('listening') == null) {
        document.getElementById("item_asset_" + id).setAttribute('listening', 'true')
        document.getElementById("item_asset_" + id).addEventListener('change', (event) => {
          this.pendingUpload = true;
          // Mostly copied from https://stackoverflow.com/a/44161989
          const input = event.target
          if ('files' in input && input.files.length > 0) {
              axios.post(this.$root.baseURL + "/item/" + id + "/upload", input.files[0],
                {
                  headers: {
                    "Content-Type": "image/png",
                    Authorization: localStorage.ANALTOK,
                  },
                }
              ).then((res) => {
                if (res.status == 200) {
                  setTimeout(() => {
                    // We wait for preview image to finish generating
                    this.$root.startToast("Uploaded item image", "green", 4000);
                    this.pendingUpload = false;
                    this.item.assetUploaded = true;
                  }, 3000);
                }
              });
          }
        });
      }
    },
    purchase(id) {
      axios
        .post(
          this.$root.baseURL + "/item/" + id + "/purchase",
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
              this.$root.me.gems = this.item.salePrice
            } else {
              this.$root.me.gems = this.item.price
            }
          }
        });
    },
    delete(id) {
      console.log("sending req")
      axios.delete(
          this.$root.baseURL + "/item/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.ANALTOK,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.deleted = true;
          }
          console.log(res)
        });
    },
    typeFormat(type) {
      return type.replace(/^./, type[0].toUpperCase());
    },
  },
};

</script>
