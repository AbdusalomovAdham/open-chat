<template>
    <div class="checkbox-wrapper">
        <input type="checkbox" class="hidden-checkbox" :id="checkboxId" :checked="modelValue"
            @change="emit('update:modelValue', $event.target.checked)" />
        <label class="styled-checkbox" :for="checkboxId">
            <svg viewBox="0 0 12 10" class="check-icon">
                <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
        </label>
    </div>
</template>

<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
defineProps({
    checkboxId: String,
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-wrapper {
    display: inline-block;
    position: relative;
}

.hidden-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.styled-checkbox {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid #d1d5db;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
}

.hidden-checkbox:checked+.styled-checkbox {
    background-color: #4fc9c9;
    border-color: #4fc9c9;
}

.check-icon {
    width: 8px;
    height: 6px;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: stroke-dashoffset 0.3s ease;
}

.hidden-checkbox:checked+.styled-checkbox .check-icon {
    stroke-dashoffset: 0;
}
</style>