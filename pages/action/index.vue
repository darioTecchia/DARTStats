<template>
  <div>
    <b-card>
      <h2>All Actions</h2>
      <b-list-group>
        <ActionItem v-for="action in actions" :key="action._id" :action="action" />
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let actions = null;
    try {
      actions = await $axios.$get("/api/action");
    } catch (error) {
      console.error(error.stack);
    }
    return { actions };
  },
};
</script>

<style>
</style>