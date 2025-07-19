<template>
    <div class="video-call-container" v-if="endCall">

        <video class="remote-video" autoplay playsinline ref="remoteVideo"></video>
        <video class="self-video" autoplay muted playsinline ref="selfVideo"></video>

        <div class="call-controls">
            <button class="control-btn hangup-btn" @click="endCallFunc">
                <IconVideoDecline />
            </button>
            <button class="control-btn mic-btn">
                <IconMicroSlash />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import IconVideoDecline from '@/components/icon/VideoDecline.vue'
import IconMicroSlash from '@/components/icon/MicroSlash.vue'

const $emit = defineEmits(['end:call'])
const endCall = ref(true)

const endCallFunc = () => {
    endCall.value = false
    $emit('end:call', false)
}
</script>