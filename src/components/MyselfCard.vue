<template>
  <v-card color="grey-darken-3" class="fill-height">
    <v-card-item>
      <v-card-title>{{ this.$root.me.username }}<div class="chiparea">
          <v-chip color="green" variant="elevated">
            <Gem></Gem>{{ this.$root.me?.gems.toLocaleString() }}
          </v-chip>
        </div>
        <v-btn color="grey-lighten-1" icon="mdi-cog" variant="text" size="small" class="mx-1"
          @click="this.$root.dialogs.accountSettings = true"></v-btn>
      </v-card-title>
    </v-card-item>
    <v-divider></v-divider>
    <v-img
      :src="'https://api-staging.anolet.com/user/' + this.$root.me.id + '/avatar/preview'"
      class="avatarImage" height="200"></v-img>
  </v-card>
</template>

<script>
import Gem from "./Gem.vue";

export default {
  name: "MyselfCard",
  components: {
    Gem
  }
}
</script>
