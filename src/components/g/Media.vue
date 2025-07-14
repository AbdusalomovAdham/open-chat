<template>
    <div class="media mt-20">
        <span class="media-title">Images</span>
        <div class="media-images mt-8 mb-20">
            <div class="images-content" v-for="(image, idx) in media?.images" :key="idx" @click="openPreview(image)">
                <img :src="image" alt="image" class="image h-64 w-64 radius-8" />
            </div>
        </div>

        <span class="media-title">Videos</span>
        <div class="media-videos mt-8">
            <div class="videos-content" v-for="(video, idx) in media?.videos" :key="idx" @click="openPreviewVideo(video)"
                @mouseover="unmuteVideo" @mouseleave="muteVideo">
                <video :src="video" alt="video" class="image h-64 w-64 radius-8" autoplay muted loop playsinline />
            </div>
        </div>

        <div class="preview-modal" v-if="previewImage" @click="previewImage = null">
            <img :src="previewImage" />
        </div>

        <div class="preview-modal" v-if="previewVideo" @click="previewVideo = null">
            <video :src="previewVideo" autoplay loop playsinline></video>
        </div>

    </div>
</template>


<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
    media: {
        type: Object,
        default: () => ({ images: [], videos: [] })
    }
})

const previewImage = ref(null)
const previewVideo = ref(null)
const openPreview = (image) => {
    previewImage.value = image
}

const openPreviewVideo = (video) => {
    previewVideo.value = video
}
</script>
