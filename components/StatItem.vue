<template>
  <div>
    <b-list-group-item
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

      <small> <a :href="'/stat/' + stat._id">Click for more details</a> </small>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object
    }
  }
}
</script>
