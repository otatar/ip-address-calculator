<template>
  <Ipv4CidSubnetCalculator />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Ipv4CidSubnetCalculator from '@/views/Ipv4CidSubnetCalculator.vue'

export default defineComponent({
  name: 'App',
  components: {
    Ipv4CidSubnetCalculator
  }
});
</script>
<style scoped>
body {
  background-color: gray;
  height: 100%;
}
</style>
