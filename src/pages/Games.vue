<template>
  <v-container fluid>
    <v-row dense>
    <template v-for="game in games" :key="game.title">
    <template v-if="game.privacyLevel == 0 || game.id == 1 || game.creator.id == this.$root.me.id">
     <v-col cols="4">
              <v-carousel hide-delimiters height="auto" show-arrows="hover" cycle>
    <v-carousel-item
      v-for="(item, i) in game.carouselImages"
      :key="i"
      :src="item"
      
    ></v-carousel-item>
  </v-carousel>
        <v-card>

          <v-card-item>
            <v-card-title>{{ game.title }} <a class="gamePlayers">{{ game.playing }}</a><a  v-if="game.id == 1" class="gamePlayers previewP">{{ game.playingP }}</a></v-card-title>
            <v-card-subtitle>by <b>{{ game.creator.name }}</b> <a class="playerstext">Online</a><a class="playerstext preview" v-if="game.id == 1">Online<br>Preview</a></v-card-subtitle>
            <v-card-description v-text="game.description"></v-card-description>
          </v-card-item>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn @click="launch(game.id)" :disabled="(game.privacyLevel == 1 && game.creator.id != this.$root.me.id) || !this.$root.me" color="green" flat prepend-icon="mdi-play" variant="flat"
              >Play</v-btn
            >
            <v-btn v-if="game.id == 1" @click="launchPreview(game.id)" :disabled="!this.$root.me" color="blue darken-1" flat prepend-icon="mdi-play-box" variant="flat"
              >Play Preview</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </template>
    </template>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Games",

  data: () => ({
    games: [],
  }),
  methods: {
    launch(id) {
      document.getElementById("player").src = "https://client.anolet.com/?game=" + id + "&auth=" + localStorage.ANALTOK;
      document.getElementById("player").style.display = "block";
      document.body.requestFullscreen();
      setTimeout(function() {
        document.getElementById("player").style.opacity = "1";
      }, 100);
    },
    launchPreview() {
      document.getElementById("player").src = "https://preview.anolet.com/"
      document.getElementById("player").style.display = "block";
      document.body.requestFullscreen();
      setTimeout(function() {
        document.getElementById("player").style.opacity = "1";
      }, 100);
    }
  },
  created: function () {
    axios
      .get("https://staging-api-infra.anolet.com/game/s", {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.ANALTOK,
        },
      })
      .then((res) => {
        if (res.data != "Unauthorized") {
          this.games = res.data;
        }
      });
  },
};
</script>
