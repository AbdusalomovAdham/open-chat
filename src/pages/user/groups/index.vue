<template>
    <div class="page-groups ws-350">
        <HeaderPage :theme="theme" :title="'Calls'" />
        <Search :theme="theme" :placeholder="'Search group...'" v-model="search" />
        <GroupList />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderPage from '@/components/g/HeaderPage.vue';
import Search from '@/components/g/Search.vue';
import GroupList from '@/components/g/GroupList.vue'
const search = ref()
</script>