<template>
    <div class="group-list mt-16 px-24">
        <div class="group-item" v-for="group in groupsFilter" :key="group.id">
            <div @click="selectedUserFunc(group)">
                <div class="group-info py-18">
                    <IconHashtag />
                    <h6 class="group-name">{{ group?.name }} </h6>
                </div>
                <span class="group-count" v-if="group?.count">{{ group?.count }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits } from 'vue';
import IconHashtag from '@/components/icon/Hashtag.vue'
const $props = defineProps({
    search: {
        type: String,
        default: null
    },
    groups: {
        type: Array,
        default: () => ([])
    }
})

const $emit = defineEmits(['selected:user'])
const groups = ref($props.groups)


const groupsFilter = computed(() => {
    const g = $props.search.trim().toLocaleLowerCase()
    return groups.value.filter(c => !g || c.name.toLocaleLowerCase().includes(g))
})

const selectedUserFunc = (group) => {
    $emit("selected:user", group)
}
</script>