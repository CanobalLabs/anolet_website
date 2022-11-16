<template>
  <v-navigation-drawer permanent>
    <v-divider></v-divider>
    <v-list nav>
<v-img src="https://anolet.com/Logo2.png" height="50" class="mx-1 siteLogo"></v-img>
        <v-card color="grey-darken-4" class="fill-height ma-1" v-if="this.$root.me">
<v-img
:src="this.$root.me.defaultRender ? 'https://cdn.anolet.com/avatars/anolet/preview.png' : `https://cdn.anolet.com/avatars/${this.$root.me.id}/preview.png`"
      class="avatarImage"
      height="200"
      
    ></v-img>
          <v-card-item>
            <v-card-title>{{ this.$root.me.username }}<div class="chiparea"><v-chip color="green-darken-3">${{ this.$root.me.amulets }}</v-chip></div></v-card-title>
          </v-card-item>
        </v-card>
      <v-list-item v-else style="justify-content: center;">
        <div class="text-center">
          <v-btn color="green" @click="this.$root.dialogs.login = true">Login</v-btn> <v-btn color="blue" @click="this.$root.dialogs.signup = true">Signup</v-btn>
        </div>
      </v-list-item>
      <v-list-item
        v-for="page in pages"
        :key="page.path"
        :prepend-icon="page.icon"
        :title="page.name"
        :value="page.name"
        :to="page.path"
      >
      <template v-slot:append v-if="page.name == 'Games' && this.$root.permissions?.includes('INFRASTRUCTURE_GAMES')">
          <v-btn
            color="grey-lighten-1"
            icon="mdi-tune-vertical"
            variant="text"
            size="small"
            @click="this.$root.dialogs.manageGames = true"
          ></v-btn>
        </template>
    </v-list-item>
            <v-list-group value="My Creations">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-hammer-screwdriver"
            title="My Creations"
          ></v-list-item>
        </template>
          <v-list-item
            title="My Items"
            prepend-icon="mdi-pencil-ruler"
            value="My Items"
            to="/creations/items"
          ></v-list-item>
          <v-list-item
            title="My Games"
            prepend-icon="mdi-wrench"
            value="My Games"
            to="/creations/games"
          ></v-list-item>
          <v-list-item
            title="My Groups"
            prepend-icon="mdi-account-group"
            value="My Groups"
            to="/creations/groups"
          ></v-list-item>
      </v-list-group>
      <v-divider v-if="this.$root.me"></v-divider>
      <v-list-item
        v-if="this.$root.me"
        key="Settings"
        prepend-icon="mdi-cog"
        title="Settings"
        to="/settings"
        value="Settings"
        @click="this.$root.dialogs.accountSettings = true"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import pages from "../pages/index.json";
import truncate from "../utilities/truncate";
import formatValue from "../utilities/formatValue";

export default {
  name: "Sidebar",

  data: () => ({
    pages,
    truncate,
    formatValue
  }),
};
</script>
