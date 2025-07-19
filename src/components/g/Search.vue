<template>
    <div class="search">
        <input type="text" class="input-search py-10 radius-8" :placeholder="$props.placeholder"
            @input="e => $emit('update:modelValue', e.target.value)">
        <div class="icon-search" >
            <IconSearch v-if="$props.theme === 'light'" />
            <IconSearchDark v-else />
        </div>
    </div>
</template>

<script setup>
import IconSearch from '@/components/icon/Search.vue'
import IconSearchDark from '@/components/icon/SearchDark.vue'
import { inject, defineProps, defineEmits } from 'vue';

const $props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    placeholder: {
        type: String,
        default: null
    },
    search: {
        type: String,
        default: null
    },
})


const $emit = defineEmits([
    'update:modelValue', 'show:addCard'
])


</script>