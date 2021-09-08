<template>
  <div>
    <b-card-group deck class="mb-4">
      <b-card
        header="Collected Statistics"
        border-variant="info"
        header-bg-variant="info"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <a href="/stat">
            <h1>{{general.statCount}}</h1>
          </a>
        </b-card-text>
      </b-card>

      <b-card
        header="Collected Sessions"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <a href="/session">
            <h1>
              {{general.sessionStructuralCount + general.sessionTextualCount}}
              (
                <span class="text-secondary">{{general.sessionStructuralCount}} S</span>
                +
                <span class="text-success">{{general.sessionTextualCount}} T</span>
              )
            </h1>
          </a>
        </b-card-text>
      </b-card>

      <b-card
        header="Collected Actions"
        border-variant="warning"
        header-bg-variant="warning"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <a href="/action">
            <h1>{{general.actionCount}}</h1>
          </a>
        </b-card-text>
      </b-card>

    </b-card-group>
    <b-card>
      <h2>Last 5 Stats</h2>
      <b-list-group>
        <StatItem v-for="stat in stats.slice(0,5)" :key="stat._id" :stat="stat" />
      </b-list-group>
    </b-card>

    <div class="mt-4">
      <b-button href="/stat" block variant="info">View all stats</b-button>
      <b-button href="/session" block variant="primary">View all sessions</b-button>
      <b-button href="/action" block variant="warning">View all actions</b-button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let stats = [];
    let general = null;
    try {
      stats = await $axios.$get("/api/stat");
      general = await $axios.$get("/api/general");
    } catch (error) {
      console.error(error.stack);
    }
    return { stats, general };
  },
};
</script>

<style>
</style>