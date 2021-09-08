<template>
  <div>
    <b-card>
      <h2>Statistic {{stat._id}}</h2>
      <h3>Executions of statistic {{stat._id}}:</h3>
      <b-list-group>
        <SessionItem v-for="session in stat.sessions" :key="session._id" :session="session" />
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let stat = null;
    try {
      stat = await $axios.$get("/api/stat/" + params.id);
    } catch (error) {
      console.error(error.stack);
    }
    return { stat };
  },
};
</script>

<style>
</style>