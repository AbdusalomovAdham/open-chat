<template>
    <div class="filter-call">
        <button v-for="filter in filters" :key="filter?.value" :class="{ 'active-btn': activeIdx === filter?.value }"
            class="radius-4 py-4 px-8" @click="activeBtn(filter.value)">
            {{ filter?.label }}
        </button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const activeIdx = ref('all')
const filters = ref([
    { label: "All", value: "all" },
    { label: "Received", value: "received" },
    { label: "Incoming", value: "incoming" },
    { label: "Missed", value: "missed" },
])

const $emit = defineEmits(['change'])

const activeBtn = (value) => {
    activeIdx.value = value
    $emit('change', value)
}
</script>
