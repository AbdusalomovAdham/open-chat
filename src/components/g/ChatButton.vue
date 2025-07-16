<template>
    <button class="chat-btn">
        <component :is="icon"></component>
    </button>
</template>

<script setup>
import { defineProps } from 'vue';

const $props = defineProps({
    icon: {
        type: Object,
        default: () => ({})
    }
})
</script>