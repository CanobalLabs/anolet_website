<template>
  <article>
    <img
      src="/AnoletLogoLarge.png"
      style="width: 125px"
    />
    <h1 class="title">Anolet<br>The Future of 2D</h1>
    <div>
      <p></p>
      <p>
        Progress is being made on Anolet daily, and we recommend you join our Discord server for the latest information and news about Anolet.
        Our Discord server also includes more information, such as signup information for Beta Testers.
      </p>

      <maintenance-announcement />

      <button
        class="discord"
        style="cursor: pointer"
        onclick="location.href = 'https://discord.gg/n7mxPMnsnX'"
      >
        <b>Discord Server</b>
      </button>
      <button
        class="gametest"
        style="cursor: pointer"
        onclick="location.href = 'https://preview.anolet.com/';"
      >
        <b>Preview Game</b>
      </button>
    </div>
  </article>
</template>

<script>
import MaintenanceAnnouncement from "./MaintenanceAnnouncement.vue";

export default {
  name: "MaintenanceInfo",
  data: () => ({}),
  components: {
    MaintenanceAnnouncement,
  },
};
</script>

