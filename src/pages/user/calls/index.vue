<template>
    <div class="page-calls ws-350">
        <HeaderPage :theme="theme" :title="'Calls'" />
        <CallsFilter class="mb-16" @change="currentFilter = $event" />
        <CallList :currentFilter="currentFilter" />
    </div>
</template>

<script setup>
import HeaderPage from '@/components/g/HeaderPage.vue';
import CallsFilter from '@/components/g/CallsFilter.vue';
import CallList from '@/components/g/CallList.vue';
import { inject, ref } from 'vue';
const theme = inject('theme')
const currentFilter = ref('all')
console.log(currentFilter)
</script>