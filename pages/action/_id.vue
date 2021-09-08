<template>
  <div>
    <b-card class="mb-4">
      <h2>Action {{action._id}}</h2>
      <ActionItem :key="action._id" :action="action" />
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let action = null;
    try {
      action = await $axios.$get("/api/action/" + params.id);
    } catch (error) {
      console.error(error.stack);
    }
    return { action };
  },
};
</script>

<style>
</style>