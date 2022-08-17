<template>
  <div>
    <b-card class="mb-4">
      <h2>Session {{session._id}}</h2>
      <p class="mb-0">
        <b>Project name</b>: {{session.projectName}} <br>
        <b>Execution time</b>: {{ (session.endTime - session.startTime)/1000 }}s <br>
        <b>User ID</b>: {{session.userId}} <br>
        <b>Total number of classes in the project</b>: {{session.nOfTotalClasses}} <br>
        <b>Total number of methods in the project</b>: {{session.nOfTotalMethods}} <br>
        <b>Smells found</b>:
        <b-progress class="" :max="session.nOfGF + session.nOfLOC + session.nOfET + session.nOfHCTD + session.nOfMG + session.nOfTCD" show-value>
          <b-progress-bar :value="session.nOfGF" :label="session.nOfGF + ' General Fixture'" variant="info"></b-progress-bar>
          <b-progress-bar :value="session.nOfLOC" :label="session.nOfLOC + ' Lack Of Cohesion'" variant="primary"></b-progress-bar>
          <b-progress-bar :value="session.nOfET" :label="session.nOfET + ' Eager Test'"  variant="dark"></b-progress-bar>

          <b-progress-bar :value="session.nOfHCTD" :label="session.nOfHCTD + ' Hard Coded Test Data'" variant="warning"></b-progress-bar>
          <b-progress-bar :value="session.nOfMG" :label="session.nOfMG + ' Mystery Guest'" variant="success"></b-progress-bar>
          <b-progress-bar :value="session.nOfTCD" :label="session.nOfTCD + ' Test Code Duplication'"  variant="secondary"></b-progress-bar>
       </b-progress>
      </p>
    </b-card>
    <b-card>
      <h3>Actions executed:</h3>
      <b-list-group>
        <ActionItem v-for="action in session.actions" :key="action._id" :action="action" />
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    let session = null;
    try {
      session = await $axios.$get("/api/session/" + params.id);
    } catch (error) {
      console.error(error.stack);
    }
    return { session };
  },
};
</script>

<style>
</style>