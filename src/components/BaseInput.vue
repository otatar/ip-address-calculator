<template>
  <div class="mx-2 mb-2">
    <label v-if="label" class="form-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="form-input field"
    >
    <span v-if="error" class="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
			{{ error }}
		</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
})
</script>