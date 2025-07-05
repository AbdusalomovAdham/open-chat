<template>
    <div class="search">
        <input type="text" class="input-search py-10 radius-8" placeholder="Search chat...">
        <div class="icon-search">
            <IconSearch v-if="$props.theme === 'light'" />
            <IconSearchDark v-else />
        </div>
    </div>
</template>

<script setup>
import IconSearch from '@/components/icon/Search.vue'
import IconSearchDark from '@/components/icon/SearchDark.vue'
import { inject, defineProps } from 'vue';

const $props = defineProps({
    theme: {
        type: String,
        default: 'light'
    }
})
</script>