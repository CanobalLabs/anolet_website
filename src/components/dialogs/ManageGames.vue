<template>
  <v-dialog v-model="this.$root.dialogs.manageGames">
    <v-card width="375">
      <v-card-title class="text-center">
        Game Infrastructure Management
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height">
          <v-btn color="orange" variant="flat">
            Reboot Backend
          </v-btn>
          <v-btn color="red" variant="flat">
            Flush Redis
          </v-btn>
        </div>
        <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height topmargin">
          <v-btn color="green" variant="flat">
            Broadcast System Chat Message
          </v-btn>
        </div>
        <div class="d-flex justify-space-around align-center flex-column flex-sm-row fill-height topmargin">
          <v-btn color="yellow" variant="flat">
            Reload
          </v-btn>
          <v-btn color="blue" variant="flat">
            Create Launch Code
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="this.$root.dialogs.manageGames = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
export default {
  name: "ManageGames",

  data: () => ({
  }),
};
</script>
  