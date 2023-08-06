<template>
  <v-app-bar flat border="b">

    <template v-slot:prepend>
      <v-img src="/longform20bd.png" width="190" class="shrink" />
    </template>
    
    <template v-slot:append v-if="this.$root.userLoaded">
      <v-chip variant="elevated" class="topbargem" size="large">
            <Gem></Gem>{{ this.$root.me.gems.toLocaleString() || ""}}
          </v-chip>
      <v-btn icon>
        <v-avatar>
          <v-img :src="'https://api-staging.anolet.com/canobalLabs/user/' + this.$root.me.id + '/pfp'" alt="My Account"></v-img></v-avatar>
      </v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer permanent>
    <v-divider></v-divider>
    <v-list nav active-color="primary" density="compact" >
      
      <v-list-item v-if="!this.$root.me" style="justify-content: center;">
        <div class="text-center">
          <v-btn color="green" @click="this.$root.dialogs.login = true">Login/Signup</v-btn>
        </div>
      </v-list-item>
      <template v-for="page in pages" :key="page.path">
        <v-list-item :prepend-icon="page.icon" :title="page.name" :value="page.name" :to="page.path"
          v-if="!(page?.accountRequired && !this.$root.me)">
          <template v-slot:append v-if="page.name == 'Games' && this.$root.permissions?.includes('INFRASTRUCTURE_GAMES')">
            <v-btn color="grey-lighten-1" icon="mdi-tune-vertical" variant="text" size="small"
              @click="this.$root.dialogs.manageGames = true"></v-btn>
          </template>
        </v-list-item>
      </template>
    </v-list>
    <template v-slot:append v-if="this.$root.me">
      <v-btn disabled color="#1A2DC1" class="mx-1" width="247" v-if="this.$route.name == 'Games'">
        Build a Games
      </v-btn>
      <v-btn @click="this.$root.dialogs.createItem = true" color="#1A2DC1" class="mx-1" width="247"
        v-if="this.$route.path.startsWith('/store') && (this.$root.permissions?.includes('UPLOAD_SELF') || this.$root.permissions?.includes('UPLOAD_ANOLET'))">
        Design an Item
      </v-btn>
      <v-btn disabled color="#1A2DC1" class="mx-1" width="247" v-if="this.$route.name == 'Gangs'">
        Form a Gang
      </v-btn>
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
import Gem from "./Gem.vue";

export default {
  name: "Sidebar",

  data: () => ({
    pages,
    truncate,
    formatValue
  }),
  components: {
    MyselfCard,
    Gem
  }
};
</script>
