<template>
   <div class="flex overflow-auto justify-center items-center sm:h-screen bg-gray-300">
     <subnet-calculator-card class="xl:w-1/2" title="IPv4 CIDR Subnet Calculator" />
   </div>
</template>
<script>
import { defineComponent } from 'vue'
import SubnetCalculatorCard from '@/components/SubnetCalculatorCard.vue'

export default defineComponent({
  components: { SubnetCalculatorCard }
})

</script>
