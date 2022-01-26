<template>
  <div id="singer">
    <MySinger></MySinger>
    <singerCounter></singerCounter>
  </div>
</template>

<script>
import MySinger from "./childComps/MySinger/MySinger";
import singerCounter from "./childComps/SingerCounter/singerCounter";

export default {
  name: "singer",
  components: {MySinger, singerCounter},
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