<template>
  <div id="mv">
    <singerCounter></singerCounter>
  </div>
</template>

<script>
import singerCounter from "./childComps/MvCounter/MvCounter";

export default {
  name: "mv",
  components: {singerCounter},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('来了老弟');
      // window.addEventListener("scroll", vm.scrollCb, true);
    })
  },

}
</script>

<style scoped>

</style>