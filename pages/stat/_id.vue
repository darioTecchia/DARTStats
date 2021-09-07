<template>
  <div>
    <b-card>
      <h2>Statistic {{stat._id}}</h2>
      <b-list-group>
        <b-list-group-item v-for="session in stat.sessions" :key="session._id" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{session.kind}} Analysis</h5>
            <small>{{$moment(session.startTime).format('LL')}}</small>
          </div>

          <p class="mb-1">
            <b>Project name</b>: {{session.projectName}} <br>
            <b>Execution time</b>: {{ (session.endTime - session.startTime)/1000 }}s <br>
            <b>User ID</b>: {{session.userId}} <br>
            <b>Total number of classes in the project</b>: {{session.nOfTotalClasses}} <br>
            <b>Smells found</b>:
            <b-progress class="" :max="session.nOfGF + session.nOfLOC + session.nOfET" show-value>
              <b-progress-bar :value="session.nOfGF" :label="session.nOfGF + ' General Fixture'" variant="success"></b-progress-bar>
              <b-progress-bar :value="session.nOfLOC" :label="session.nOfLOC + ' Lack Of Cohesion'" variant="warning"></b-progress-bar>
              <b-progress-bar :value="session.nOfET" :label="session.nOfET + ' Eager Test'"  variant="danger"></b-progress-bar>
            </b-progress>
          </p>

          <small>Click for more details</small>
        </b-list-group-item>
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