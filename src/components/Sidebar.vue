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

      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" class="" block>
            Create
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="this.$root.dialogs.createItem = true">
            <v-list-item-title>Game</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="mx-1 my-2">
        <v-card color="grey-darken-3" class="fill-height">

          <v-card-item>
            <v-card-title>{{ this.$root.me.username }}<div class="chiparea">
                <v-chip color="green" variant="elevated"><Amulet></Amulet>{{ this.$root.me.amulets }}</v-chip>
              </div>
              <v-btn color="grey-lighten-1" icon="mdi-cog" variant="text" size="small" class="mx-1"
                @click="this.$root.dialogs.accountSettings = true"></v-btn>
            </v-card-title>
          </v-card-item>

          <v-divider></v-divider>
          <v-img
            :src="this.$root.me.defaultRender ? 'https://cdn.anolet.com/avatars/anolet/preview.png' : `https://cdn.anolet.com/avatars/${this.$root.me.id}/preview.png`"
            class="avatarImage" height="200"></v-img>
        </v-card>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import pages from "../pages/index.json";
import truncate from "../utilities/truncate";
import formatValue from "../utilities/formatValue";
import Amulet from "./Amulet.vue";

export default {
  name: "Sidebar",

  data: () => ({
    pages,
    truncate,
    formatValue
  }),
  components: {
    Amulet
  }
};
</script>
