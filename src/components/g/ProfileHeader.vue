<template>
    <div class="profile-header">
        <div class="profile-top-section">
            <div class="section-main pa-24">
                <span>{{ $props?.title }}</span>
                <IconsThreeDot class="section-icon" />
            </div>
        </div>
        <div class="profile-info">
            <div class="profile-img w-80 h-80">
                <img :src="$props?.img" alt="" class="w-72 h-72">
                <Camera v-if="showCamera" />
                <CameraDark v-else-if="showCameraDark" />
            </div>
            <h2 class="profile-name">{{ $props?.name }}</h2>
            <span class="profile-status">Last seen: {{ getCurrentTime() }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import IconsThreeDot from '@/components/icon/ThreeDots.vue'
import Camera from '@/components/icon/Camera.vue';
import CameraDark from '@/components/icon/Camera.vue';
const $props = defineProps({
    title: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    img: {
        type: Object,
        default: null
    },
    theme: {
        type: String,
        default: null
    }
})

const showCamera = computed(() => {
    return $props?.theme === 'light' && $props?.title?.toLowerCase() !== 'profile';
});

const showCameraDark = computed(() => {
    return $props?.theme === 'dark' && $props?.title?.toLowerCase() !== 'profile';
});

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

</script>