<template>
    <transition name="slide-down-fade">
        <div class="call-wrapper" v-if="callStart || incomingCall">
            <transition name="slide-down-fade" v-if="incomingCall">
                <div class="call-content pa-48">
                    <div class="call-avatar">
                        <img :src="User" alt="" class="w-100 h-100">
                    </div>
                    <span class="call-title">voise calling</span>
                    <div class="call-actions">
                        <button class="btn call-decline-btn" @click="declineCall()">
                            <IconPhoneDecline v-if="typeCall === 'audio'" />
                            <IconVideoDecline v-else />
                        </button>
                        <button class="btn call-accept-btn" @click="acceptCall()">
                            <IconPhoneAccpet v-if="typeCall === 'audio'" />
                            <IconVideoAccpet v-else />
                        </button>
                    </div>
                </div>
            </transition>

            <div class="video-section" v-if="!incomingCall">
                <VideoCall />
            </div>
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
import { computed } from 'vue'
import { useCallStore } from '@/store/user/call'
import { useCallsStore } from '@/store/user/calls'

const callsStore = useCallsStore()
const callStore = useCallStore()

const callStart = computed(() => callStore.callStart)
const incomingCall = computed(() => callStore.incomingCall)
const typeCall = computed(() => callStore.typeCall)
const acceptCall = async () => {
    await callStore.acceptCall()
}
const declineCall = async () => {
    await callStore.declineCall()
    await callsStore.fetchList()
}



</script>