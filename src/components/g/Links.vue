<template>
    <div class="links-wrapper">
        <a :href="link?.url" v-for="(link, idx) in $props?.media?.links" :key="idx" class="link-content">{{
            link?.url }}</a>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const $props = defineProps({
    media: {
        type: Object,
        default: () => ({ links: [] })
    }
})

console.log('media', $props.media)
</script>