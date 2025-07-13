<template>
    <div class="profile-media px-24 mb-16">
        <div class="profile-media-title">
            <button class="media-tab" v-for="(tab, idx) in tabs" :key="idx" :class="{ 'active-tab': activeIdx === idx }"
                @click="activeTab(idx, tab?.type)">{{
                tab?.btn }}</button>
        </div>
        <Media :media="$props.media" v-if="tabName === 'media'" />
        <Files :media="$props.media" v-else-if="tabName === 'attached-files'" />
        <Links :media="$props.media" v-else-if="tabName === 'links'" />
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import Media from '@/components/g/Media.vue';
import Files from '@/components/g/Files.vue'
import Links from '@/components/g/Links.vue'
const tabs = ref([
    { btn: 'Media', type: 'media' },
    { btn: 'Attached Files', type: 'attached-files' },
    { btn: 'Links', type: 'links' }
])
const activeIdx = ref(0)
const tabName = ref('media')
const activeTab = (idx, type) => {
    activeIdx.value = idx
    tabName.value = type
}

const $props = defineProps({
    media: Object,
    default: () => ({ images: [], videos: [], files: [] })
})
</script>
