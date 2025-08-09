<template>
    <div :class="containerClass">
        <!-- Video qo‘ng‘iroq holati -->
        <div v-if="isVideoCall">
            <video class="remote-video" autoplay muted playsinline ref="remoteVideo"></video>
            <video class="self-video" autoplay playsinline ref="localVideo"></video>
        </div>

        <!-- Qo‘ng‘iroq boshqaruv tugmalari -->
        <div class="call-controls">
            <!-- Video tugatish -->
            <button v-if="isVideoCall" class="control-btn hangup-btn" @click="handleEndCall">
                <IconVideoDecline />
            </button>

            <!-- Mikrofon o‘chirish -->
            <button v-if="isVideoCall" class="control-btn mic-btn">
                <IconMicroSlash />
            </button>

            <!-- Audio tugatish -->
            <button v-else class="control-btn" @click="handleEndCall">
                <IconPhoneDecline />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineEmits } from 'vue'
import IconVideoDecline from '@/components/icon/VideoDecline.vue'
import IconMicroSlash from '@/components/icon/MicroSlash.vue'
import IconPhoneDecline from '@/components/icon/PhoneDecline.vue'
import { useCallStore } from '@/store/user/call'


const emit = defineEmits(['end:call'])
const callStore = useCallStore()
const isVideoCall = computed(() => callStore.typeCall === 'video')
const containerClass = computed(() => callStore.typeCall === 'audio' ? 'audio-call' : 'video-call-container')

const localVideo = ref(null)
const remoteVideo = ref(null)


const handleEndCall = () => {
    callStore.callEnd()
    emit('end:call', false)
}

onMounted(() => {
    if (localVideo.value && callStore.localStream) {
        localVideo.value.srcObject = callStore.localStream
    }
    if (remoteVideo.value && callStore.remoteStream) {
        remoteVideo.value.srcObject = callStore.remoteStream
    }
})

watch(() => callStore.localStream, (newStream) => {
    if (newStream && localVideo.value) {
        localVideo.value.srcObject = newStream
    }
})

watch(() => callStore.remoteStream, (newStream) => {
    if (newStream && remoteVideo.value) {
        remoteVideo.value.srcObject = newStream
    }
})
</script>