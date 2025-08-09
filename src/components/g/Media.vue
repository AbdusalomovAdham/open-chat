<template>
    <div class="media mt-20">
        <span class="media-title">Images</span>
        <div class="media-images mt-8 mb-20">
            <template v-for="(image, idx) in messageList" :key="idx">
                <div v-if="image?.file?.message_type === 'image'" class="images-content"
                    @click="openPreview(image?.file?.url)">
                    <img :src="`http://localhost:3000${image?.file?.url}`" alt="image"
                        class="image h-64 w-64 radius-8" />
                </div>
            </template>
        </div>

        <span class="media-title">Videos</span>
        <div class="media-videos mt-8">
            <template v-for="(video, idx) in  messageList" :key="idx">
                <div class="videos-content" @click="openPreviewVideo(video)" @mouseover="unmuteVideo"
                    @mouseleave="muteVideo" v-if="video?.file?.message_type === 'video'">
                    <video :src="`http://localhost:3000${video?.file?.url}`" alt="video"
                        class="image h-64 w-64 radius-8" autoplay muted loop playsinline />
                </div>
            </template>
        </div>

        <div class="preview-modal" v-if="previewImage" @click="previewImage = null">
            <img :src="`http://localhost:3000${previewImage}`" />
        </div>

        <div class="preview-modal" v-if="previewVideo" @click="previewVideo = null">
            <video :src="`http://localhost:3000${previewVideo}`" loop playsinline controls></video>
        </div>

    </div>
</template>


<script setup>
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue'
import { useChatStore } from '@/store/user/chat';

const chatStore = useChatStore()

const previewImage = ref(null)
const previewVideo = ref(null)

const openPreview = (image) => {
    previewImage.value = image
}

const openPreviewVideo = (video) => {
    previewVideo.value = video.file?.url
}

const messageList = computed(() => chatStore.messages)

const handleKeydown = e => {
    if (e.key === 'Escape') {
        previewImage.value = null
        previewVideo.value = null
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})

</script>
