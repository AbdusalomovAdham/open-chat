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
                <img :src="$props?.profileInfo?.avatar" alt="" class="w-72 h-72">
                <div class="profile-camera absolute bottom-0 right-0" v-if="show">
                    <input type="file" accept="image/*" class="hidden-input" @change="handleImageChange" />
                    <Camera v-if="$props?.theme === 'light'" />
                    <CameraDark v-else />
                </div>
            </div>
            <h2 class="profile-name">{{ $props?.profileInfo?.username }}</h2>
            <span class="profile-status" v-if="!show">Last seen: {{ getCurrentTime() }}</span>
            <span class="profile-control" v-else>
                I am Available
                <IconDownDrop />
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue';
import IconsThreeDot from '@/components/icon/ThreeDots.vue'
import Camera from '@/components/icon/Camera.vue';
import CameraDark from '@/components/icon/CameraDark.vue';
import IconDownDrop from '@/components/icon/DownDrop.vue'
import { useSettingStore } from '@/store/user/settings';

const user = computed(() => useSettingStore().user)
const $props = defineProps({
    title: {
        type: String,
        default: null
    },
    profileInfo: {
        type: Object,
        defaut: {}
    },
    theme: {
        type: String,
        default: null
    }
})

console.log()
const previewImg = ref($props.img)

console.log($props.title, $props.theme)
const show = computed(() => {
    return $props.title.toLowerCase() !== 'profile';
});


const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
        previewImg.value = reader.result
    }
    reader.readAsDataURL(file)
}

</script>