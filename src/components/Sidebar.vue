<template>
  <v-navigation-drawer permanent>
    <img
      style="
        width: 40%;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 50%;
        transform: translate(-50%);
        border-radius: 20px;
      "
      src="https://media.discordapp.net/attachments/975559137712807976/975560249140457573/AnoletLogoSmallWhite.png?width=663&height=663"
    />
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item to="/" v-if="this.$root.me">
        <v-list-item-avatar width="12">
          <img :src="this.$root.me.defaultRender ? 'https://cdn.anolet.com/avatars/anolet/internal.png' : `https://cdn.anolet.com/avatars/${this.$root.me.userId}/internal.png`" class="pfp" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="white--text username"
            >{{ truncate(this.$root.me.username, 6) }}<a class="crownsbar">{{ formatValue(this.$root.me.amulets || 69696969) }}</a>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
      ></v-list-item>

      <v-divider v-if="this.$root.me"></v-divider>
      <v-list-item
        v-if="this.$root.me"
        key="Settings"
        prepend-icon="mdi-cog"
        title="Settings"
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
