<template>
   <div class="flex justify-center items-center w-full h-full bg-gray-300">
     <subnet-calculator-card class="lg:w-1/2" title="IPv4 CIDR Subnet Calculator" />
   </div>
</template>
<script>
import { defineComponent } from 'vue'
import SubnetCalculatorCard from '@/components/SubnetCalculatorCard.vue'

export default defineComponent({
  components: { SubnetCalculatorCard }
})

</script>
