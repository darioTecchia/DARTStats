<template>
  <div>
    <b-list-group-item class="flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{action.actionKind}}</h5>
        <small>{{$moment(action.timestamp).format('LL')}}</small>
      </div>

      <p class="mb-0">
        <b>Smell kind</b>: {{action.smellKind}} <br>
        <b>Position</b>: <code class="">{{action.packageName}}.{{action.className}}#{{action.methodName}}()</code> <br>

        <b-form-checkbox disabled button-variant="danger" :checked="action.actionCanceled" switch>Canceled</b-form-checkbox>
        <b-form-checkbox disabled button-variant="success" :checked="action.actionDone" switch>Done</b-form-checkbox>
      </p>

      <small> <a :href="'/action/' + action._id">Click for more details</a> </small>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  props: {
    action: {
      type: Object
    }
  }
}
</script>
