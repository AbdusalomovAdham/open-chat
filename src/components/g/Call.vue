<template>
    <transition name="slide-down-fade">
        <div class="call-wrapper" v-if="close">
            <transition name="slide-down-fade">
                <div class="call-content pa-48" v-if="closeControlCall">
                    <div class="call-avatar">
                        <img :src="User" alt="" class="w-100 h-100">
                    </div>
                    <span class="call-title">voise calling</span>
                    <div class="call-actions">
                        <button class="btn call-decline-btn" @click="endCall()">
                            <IconPhoneDecline v-if="call === 'audio'" />
                            <IconVideoDecline v-else />
                        </button>
                        <button class="btn call-accept-btn" @click="startCallFunc()">
                            <IconPhoneAccpet v-if="call === 'audio'" />
                            <IconVideoAccpet v-else />
                        </button>
                    </div>
                </div>
            </transition>

            <transition name="slide-down-fade">
                <div class="video-section" v-if="startCall">
                    <VideoCall @end:call="endCall" />
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import User from '@/assets/images/user.png'
import IconPhoneDecline from '@/components/icon/PhoneDecline.vue'
import IconPhoneAccpet from '@/components/icon/PhoneAccept.vue'
import IconVideoDecline from '@/components/icon/VideoDecline.vue'
import IconVideoAccpet from '@/components/icon/VideoAccept.vue'
import VideoCall from '@/components/g/VideoCall.vue'
import { ref, defineProps, defineEmits, watch } from 'vue'

const $props = defineProps({
    call: {
        type: String,
        default: 'audio'
    },
    callStart: Boolean,
    callType: String
})

const emit = defineEmits(['update:callStart', 'update:callType'])


const close = ref($props.callStart)
const call = ref($props.callType)
const startCall = ref(false)
const closeControlCall = ref(true)

const endCall = () => {
    close.value = false
    startCall.value = false
    closeControlCall.value = true
    emit('update:callStart', false)
}

const startCallFunc = () => {
    closeControlCall.value = false
    setTimeout(() => {
        startCall.value = true
    }, 300)

}

watch(() => $props.callStart, (val) => {
    close.value = val
})

watch(() => $props.callType, (val) => {
    call.value = val
})
</script>