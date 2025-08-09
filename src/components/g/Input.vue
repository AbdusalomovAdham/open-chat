<template>
    <div class="input">
        <label :for="$props.placeholder">{{ $props.label }}
            <span v-if="$props.important">*</span>
        </label>
        <input :type="$props.type" :placeholder="$props.placeholder" :value="$props.modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :accept="$props?.accept"
            :disabled="$props.disabled" :name="$props.placeholder">
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const $props = defineProps({
    type: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    important: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    accept: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>