<template>
    <!-- No email -->
    <v-alert type="warning" class="mbottom" v-if="this.$root?.me && !this.$root.me.emailVerified">Your account doesn't have a verified email attached to it. Verify your email to unlock the full functionality of Anolet.</v-alert>
</template>

<script>
export default {
    name: "Alerts"
}
</script>