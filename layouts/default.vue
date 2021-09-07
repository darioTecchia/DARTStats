<template>
  <b-container class="mt-4">
    <b-jumbotron
      header="DARTStats"
      lead="Stats pot for DART smell detector plugin"
    >
      <b-breadcrumb class="p-0 m-0" :items="formatPath"></b-breadcrumb>
    </b-jumbotron>
    <Nuxt />
  </b-container>
</template>

<script>
export default {
  computed: {
    formatPath() {
      let tempPath = "";
      return this.$route.path.split("/").map((elem) => {
        tempPath += elem + "/";
        return ({
          text: elem != "" ? elem : "home",
          href: tempPath,
        });
      });
    }
  }
};
</script>