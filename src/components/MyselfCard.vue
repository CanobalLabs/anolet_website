<template>
<v-card color="grey-darken-3" class="fill-height">

<v-card-item>
  <v-card-title>{{ this.$root.me.username }}<div class="chiparea">
      <v-chip color="green" variant="elevated"><Amulet></Amulet>{{ this.$root.me.amulets.toLocaleString() }}</v-chip>
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
</template>

<script>
import Amulet from "./Amulet.vue";

export default {
    name: "MyselfCard",
    components: {
        Amulet
    }
}
</script>