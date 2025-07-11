<template>
    <div class="page-groups ws-350">
        <HeaderPage :theme="theme" :title="'Groups'" :icon="icon"/>
        <Search :theme="theme" :placeholder="'Search group...'" v-model="search" />
        <GroupList :search="search" />
    </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import HeaderPage from '@/components/g/HeaderPage.vue';
import Search from '@/components/g/Search.vue';
import GroupList from '@/components/g/GroupList.vue'
const search = ref('')
const icon = ref('group')
const theme = inject('theme')
</script>