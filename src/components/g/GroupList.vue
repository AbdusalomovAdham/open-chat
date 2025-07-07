<template>
    <div class="group-list">
        <div class="group-item" v-for="group in groups" :key="group.id">
            <div class="group-info">
                <IconHashtag />
                <h6 class="group-name">{{ group?.name }} </h6>
            </div>
            <span class="group-count">{{ group?.count }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import IconHashtag from '@/components/icon/Hashtag.vue'
const groups = ref([
    { id: 1, name: 'Designer', count: null },
    { id: 2, name: 'Landing Design', count: '09' },
    { id: 3, name: 'Snacks', count: '04' },
    { id: 4, name: 'Reporting', count: '10' }
])
</script>