<template>
  <div>
    <b-card>
      <h2>All Sessions</h2>
      <b-list-group>
        <SessionItem v-for="session in sessions" :key="session._id" :session="session" />
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let sessions = null;
    try {
      sessions = await $axios.$get("/api/session");
    } catch (error) {
      console.error(error.stack);
    }
    return { sessions };
  },
};
</script>

<style>
</style>