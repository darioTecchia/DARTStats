<template>
  <div>
    <b-list-group-item class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{session.kind}} Analysis ({{session._id}})</h5>
        <small>{{$moment(session.startTime).format('LL')}}</small>
      </div>

      <p class="mb-1">
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

      <small> <a :href="'/session/' + session._id">Click for more details</a> </small>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  props: {
    session: {
      type: Object
    }
  }
}
</script>
