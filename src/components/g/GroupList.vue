<template>
    <div class="group-list mt-16 px-24">
        <div class="group-item" v-for="group in groupsFilter" :key="group.id">
            <div class="group-info py-18">
                <IconHashtag />
                <h6 class="group-name">{{ group?.name }} </h6>
            </div>
            <span class="group-count" v-if="group?.count">{{ group?.count }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';
import IconHashtag from '@/components/icon/Hashtag.vue'
const $props = defineProps({
    search: {
        type: String,
        default: null
    }
})
const groups = ref([
    { id: 1, name: 'Designer', count: null },
    { id: 2, name: 'Landing Design', count: '09' },
    { id: 3, name: 'Snacks', count: null },
    { id: 4, name: 'Reporting', count: '10' },
    { id: 5, name: 'Frontend Team', count: '03' },
    { id: 6, name: 'Backend Team', count: null },
    { id: 7, name: 'Marketing', count: '12' },
    { id: 8, name: 'Finance', count: null },
    { id: 9, name: 'HR', count: '06' },
    { id: 10, name: 'Product Owners', count: null },
    { id: 11, name: 'Support', count: '02' },
    { id: 12, name: 'QA Team', count: '05' },
    { id: 13, name: 'Sales', count: null },
    { id: 14, name: 'Mobile Devs', count: '04' },
    { id: 15, name: 'Research', count: null }
])


const groupsFilter = computed(() => {
    const g = $props.search.trim().toLocaleLowerCase()
    return groups.value.filter(c => !g || c.name.toLocaleLowerCase().includes(g))
})
</script>