<template>
  <div>
    <b-card>
      <h2>All Stats</h2>
      <b-list-group>
        <StatItem v-for="stat in stats.slice(0,5)" :key="stat._id" :stat="stat" />
      </b-list-group>
    </b-card>

    <div class="mt-4">
      <b-button href="/session" block variant="primary">View all sessions</b-button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let stats = [];
    try {
      stats = await $axios.$get("/api/stat");
    } catch (error) {
      console.error(error.stack);
    }
    return { stats };
  },
};
</script>

<style>
</style>