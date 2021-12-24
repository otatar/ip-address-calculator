<template>
    <div class="bg-white rounded-lg shadow-lg m-8 p-8 w-full">
        <div class="border-b border-grey-200 mb-4" >
            <h3 class="text-grey-700 text-xl text-semibold">{{title}}</h3>
        </div>
        <div>
            <form id = "subnet-calculator" class="grid sm:grid-cols-3 gr">
                <fieldset class="border border-solid border-gray-300 p-3 mb-4 rounded-lg grid sm:grid-cols-3 col-span-3">
                    <legend class="block tracking-wide text-gray-700 text-s font-semibold mb-1">Input</legend>
                    <base-input data-testid="ipaddress" label="IP Address" :error="ipAddressError" v-model="ipAddress" @change="ipAddressChange" />
                    <base-input data-testid="subnetmask" label="Subnet Mask" :error="subnetMaskError" v-model="subnetMask" @change="subnetMaskChange" />
                    <base-select data-testid="maskbits" label="Mask Bits" v-model="maskBits" :options="maskBitOptions" />
                </fieldset>
                <fieldset class="border border-solid border-gray-300 p-3 rounded-lg grid sm:grid-cols-3 col-span-3">
                    <legend class="block tracking-wide text-gray-700 text-s font-semibold mb-1">Output</legend>
                    <base-input label="IP Address CIDR" v-model="ipAddressCidr" disabled />
                    <base-input data-testid="subnetid" label="Subnet ID" v-model="subnetId" disabled />
                    <base-input data-testid="broadcast" label="Broadcast" v-model="broadcast" disabled />
                    <base-input label="Host Range" v-model="hostRange" disabled />
                    <base-input data-testid="maxhosts" label="Max Hosts" v-model="maxHosts" disabled />
                    <base-input data-testid="maxsubnets" label="Max Subnets" v-model="maxSubnets" disabled />
                </fieldset>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import subnetMaskOptions from '@/classes/subnet-mask-options';
import IPv4SubnetCalculator from '@/classes/IPv4CidrSubnetCalculator'


export default defineComponent({
    components: { BaseInput, BaseSelect },
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {

        const ipAddress = ref("");
        let ipAddressError = ref("");
        const ipAddressChange = () => {
            if(isIpAddress(ipAddress.value as string) === true) {
                ipAddressError.value = ''
                formChanged()
            } else {
                ipAddressError.value = 'IP Address is invalid'
                resetOutput()
            }
        }
       
        const subnetMask = ref("");
        let subnetMaskError = ref("");
        const subnetMaskChange = () => {
            if(isSubnetMask(subnetMask.value as string) === true) {
                maskBits.value = subnetMaskOptions.filter(item => item.mask == subnetMask.value)[0].maskBits
                subnetMaskError.value = ''
                formChanged()
            } else {
                subnetMaskError.value = 'Subnet Mask is invalid'
                resetOutput()
            }
        }

        let maskBits = ref(0);
        // Watch for changes is select mask bits
        watch(maskBits, mb => {
            subnetMask.value = subnetMaskOptions.filter(sm => sm.maskBits == mb)[0].mask
            subnetMaskChange()
        })

        let maskBitOptions = subnetMaskOptions.map(opt => opt.maskBits);

        let ipAddressCidr = ref("");
        let subnetId = ref("");
        let broadcast = ref("");
        let hostRange = ref("");
        let maxHosts = ref(0);
        let maxSubnets = ref(0);

        //IP Address validation
        const isIpAddress = (value: string) => {
            const ipAddressRegEx = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            const regexp = new RegExp(ipAddressRegEx);
            if(regexp.test(value)) {
                return true;
            }
            return "IP Address is invalid";
        }

        //Subnet mask validation func
        const isSubnetMask = (value: string) => {
            const validSM = subnetMaskOptions.map(sm => sm.mask);
            if(validSM.includes(value)) {
                return true;
            } 
            return "Subnet mask is invalid"
        }
        
        const formChanged = () => {
            if(isIpAddress(ipAddress.value) === true && isSubnetMask(subnetMask.value) === true) {
                const ipV4SubCacl = new IPv4SubnetCalculator(ipAddress.value, subnetMask.value);
                const subInfo = ipV4SubCacl.subnetCalculatorInfo();
                subnetId.value = subInfo.subnetID;
                broadcast.value = subInfo.broadcast;
                hostRange.value = subInfo.hostRange;
                maxHosts.value = subInfo.maxHosts;
                maxSubnets.value = subInfo.maxSubnets;
                ipAddressCidr.value = subInfo.ipAddressCidr;
            } 
        }

        const resetOutput = () => {
            ipAddressCidr.value = ''
            subnetId.value = ''
            broadcast.value = ''
            maxHosts.value = 0
            maxSubnets.value = 0
            hostRange.value = ''
        }

        return { ipAddress, subnetMask, maskBits, ipAddressCidr, maskBitOptions, subnetId, broadcast, hostRange, maxHosts, maxSubnets, formChanged, subnetMaskChange, ipAddressChange, ipAddressError, subnetMaskError } 
    }
});
</script>