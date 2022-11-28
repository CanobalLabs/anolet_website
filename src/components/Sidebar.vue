<template>
  <v-navigation-drawer permanent>
    <v-divider></v-divider>
    <v-list nav active-color="primary">
      <v-img src="https://anolet.com/Logo2.png" height="100" class="mx-1 my-2 siteLogo"></v-img>
      <v-list-item v-if="!this.$root.me" style="justify-content: center;">
        <div class="text-center">
          <v-btn color="green" @click="this.$root.dialogs.login = true">Login</v-btn>
          <v-btn color="blue" @click="this.$root.dialogs.signup = true">Signup</v-btn>
        </div>
      </v-list-item>
      <template v-for="page in pages" :key="page.path">
        <v-list-item :prepend-icon="page.icon" :title="page.name" :value="page.name" :to="page.path"
          v-if="!(page?.accountRequired && !this.$root.me)">
          <template v-slot:append
            v-if="page.name == 'Games' && this.$root.permissions?.includes('INFRASTRUCTURE_GAMES')">
            <v-btn color="grey-lighten-1" icon="mdi-tune-vertical" variant="text" size="small"
              @click="this.$root.dialogs.manageGames = true"></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append v-if="this.$root.me">

      <v-menu location="top">
        <template v-slot:activator="{ props }">
          <v-btn color="#1A2DC1" v-bind="props" class="mx-1" width="247">
            Create
          </v-btn>
        </template>
        <v-list class="adjustpos" color="blue">
          <v-list-item @click="this.$root.dialogs.createItem = true" max-width="247">
            <template v-slot:prepend>
              <v-icon icon="mdi-wrench"></v-icon>
            </template>
            <v-list-item-title>Game</v-list-item-title>
          </v-list-item>
          <v-list-item @click="this.$root.dialogs.createGroup = true">
            <template v-slot:prepend>
              <v-icon icon="mdi-account-multiple-plus"></v-icon>
            </template>
            <v-list-item-title>Group</v-list-item-title>
          </v-list-item>
          <v-list-item @click="this.$root.dialogs.createGroup = true">
            <template v-slot:prepend>
              <v-icon icon="mdi-brush"></v-icon>
            </template>
            <v-list-item-title>Item</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="mx-1 my-2">
        <MyselfCard></MyselfCard>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import pages from "../pages/index.json";
import truncate from "../utilities/truncate";
import formatValue from "../utilities/formatValue";
import MyselfCard from "./MyselfCard.vue";

export default {
  name: "Sidebar",

  data: () => ({
    pages,
    truncate,
    formatValue
  }),
  components: {
    MyselfCard
  }
};
</script>
