<template>
    <div class="page-header px-24 py-24">
        <span>{{ $props?.title }}</span>
        <div class="page-header-add radius-4 w-30 h-30">
            <IconAdd class="header-add-icon" v-if="$props.theme === 'light'" />
            <IconAddDark class="header-add-icon-dark" v-else />
        </div>
    </div>
</template>

<script setup>
import IconAddDark from '@/components/icon/AddDark.vue'
import IconAdd from '@/components/icon/Add.vue';
import { defineProps } from 'vue'
const $propr = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    title: {
        type: String,
        default: null
    }
})
</script>