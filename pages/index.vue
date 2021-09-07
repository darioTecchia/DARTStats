<template>
  <b-container class="mt-5">
    <b-jumbotron
      header="DARTStats"
      lead="Stats pot for DART smell detector plugin"
    >
    </b-jumbotron>

    <b-card>
      <h2>Last Stats:</h2>
      <b-list-group>
        <b-list-group-item
          v-for="stat in stats"
          :key="stat._id"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Stat {{ stat._id }}</h5>
          </div>

          <p class="mb-1">
            Number of total sessions (executions):
            <b-badge pill variant="primary">{{
              stat.nOfTotalExecution
            }}</b-badge>
            (<b-badge pill variant="secondary"
              >Textual {{ stat.nOfExecutionTextual }}</b-badge
            >
            <b-badge pill variant="success">
              Structural {{ stat.nOfExecutionStructural }}</b-badge
            >)
          </p>

          <small> <a :href="'/stat/' + stat._id">View details</a> </small>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <div class="mt-4">
      <b-button href="/session" block variant="primary">View all sessions</b-button>
    </div>
  </b-container>
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