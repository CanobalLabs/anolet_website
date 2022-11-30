<template>
  <v-dialog v-model="this.$root.dialogs.createItem">
    <v-card width="350px">
      <v-card-title v-if="this.$root.createItemState == 'create'">Draft an item</v-card-title>
      <v-card-title v-else-if="this.$root.createItemState == 'edit'">Edit item</v-card-title>
      <v-card-text>
        <v-switch
          v-if="this.$root.permissions.includes('UPLOAD_ANOLET') && this.$root.permissions.includes('UPLOAD_SELF')"
          inset color="primary" label='Publish as website' v-model="anoletAccount" class="input"></v-switch>
        <v-select variant="outlined" label="Type" v-model="type" class="input" :rules="[rules.required]"
          :items="[{ title: 'Accessory', value: 'accessory' }, { title: 'Face', value: 'face' }, { title: 'Body', value: 'body' }, { title: 'Shoes', value: 'shoes' }]">
        </v-select>
        <v-text-field class="input" variant="outlined" v-model="name" label="Name" required min="1" max="255" :rules="[rules.required]">
        </v-text-field>
        <v-textarea class="input" variant="outlined" v-model="description" label="Description" max-rows="6" :rules="[rules.required]">
        </v-textarea>
        <template v-if="id">
          <v-text-field class="input" variant="outlined" v-model="price" label="Regular Item Price" required min="1" max="255" :rules="[rules.num, rules.required]">
          </v-text-field>
          <v-text-field class="input" variant="outlined" v-model="salePrice" label="Sale Price" required min="1" max="255" :rules="[rules.num, rules.required]">
          </v-text-field>
          <v-text-field class="input" variant="outlined" v-model="saleEnd" label="Sale Ends (Set past date for no sale)" required min="1" max="255" :rules="[rules.required]">
          </v-text-field>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text
          @click="this.$root.dialogs.createItem = false; this.$root.createItemState = 'create'; type = ''; name = ''; description = ''; anoletAccount = false; price = 0; available = false; saleEnd = '2001-01-01T05:00:00.000Z'; salePrice = 0; id = ''; assetUploaded = false">
          Cancel
        </v-btn>
        <v-btn v-if="this.$root.createItemState == 'create'" color="blue darken-1" text @click="createItem()">Create
        </v-btn>
        <template v-else-if="this.$root.createItemState == 'edit'">
          <v-btn color="blue darken-1" text @click="save(false)">Save</v-btn>
          <v-btn v-if="this.available == false && this.assetUploaded" color="green darken-1" text @click="save(true)">Save &
            Release</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import evt from '../../utilities/eventBus.js'

export default {
  name: "CreateItem",
  data: () => ({
    rules: {
      num: value => (!isNaN(value) && !value.includes('.')) || "Must be a whole number",
      required: value => !!value || 'Required'
    },
    type: "",
    name: "",
    description: "",
    anoletAccount: false,
    price: 0,
    available: false,
    saleEnd: '2001-01-01T05:00:00.000Z',
    salePrice: 0,
    id: "",
    assetUploaded: false,
    evt: evt
  }),
  mounted: function () {
    evt.$on('item_edit', (item) => { // here you need to use the arrow function
      this.$root.createItemState = 'edit'; this.$root.editingItem = item; this.$root.dialogs.createItem = true;
      this.type = item.type;
      this.name = item.name
      this.description = item.description
      this.anoletAccount = item.anoletAccount
      this.price = item.price
      this.available = item.available
      this.saleEnd = item.saleEnd
      this.salePrice = item.salePrice
      this.assetUploaded = item.assetUploaded
      this.id = item.id
    })
  },
  methods: {
    save(release) {
      axios.patch(this.$root.baseURL + "/item/" + this.id, {
        type: this.type,
        name: this.name,
        description: this.description,
        price: Number(this.price),
        available: this.available ? undefined : release,
        saleEnd: this.saleEnd,
        salePrice: this.salePrice,
        anoletAccount: this.anoletAccount
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.ANALTOK,
          },
        }).then(res => {
          if (res.status == 200) {
            this.$root.startToast("Item edited", "green", 3000);
            this.$root.dialogs.createItem = false;
            this.$root.createItemState = 'create'; this.type = ''; this.name = ''; this.description = ''; this.anoletAccount = false; this.price = 0; this.available = false; this.saleEnd = "2001-01-01T05:00:00.000Z"; this.salePrice = 0; this.id = ""; this.assetUploaded = false;
            evt.$emit('refresh_store', "");
          }
        })
    },
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
            this.type = ''; this.name = ''; this.description = ''; this.anoletAccount = false;
            this.$router.push("/store/my-creations")
            evt.$emit('refresh_store', "my-creations")
          }
        })
    }
  }
};
</script>