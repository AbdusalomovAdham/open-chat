<template>
    <div class="chat-window-header pa-16">
        <div class="window-header-user-info">
            <div class="close-chat" @click="closeChatFunc()">
                <IconCaretLeft />
            </div>
            <div class="user-avatar">
                <img class="w-40 h-40" :src="userDetail?.avatar" alt="User Avatar">
            </div>
            <div class="user-details">
                <div class="user-name" @click="openPanel">{{ $props.selectedUser?.username || $props.selectedUser?.name
                    }} 👋</div>
                <div class="user-status">
                    {{ $props.selectedUser?.status }}
                    <span class="typing">Typing
                        <animation />
                    </span>
                </div>
            </div>
        </div>

        <div class="action-buttons">
            <ChatButton :icon="IconPhone" class="btn call-btn" @click="callStart('audio')" />
            <ChatButton :icon="IconVideoCamera" class="btn video-btn" @click="callStart('video')" />
            <ChatButton :icon="IconThreeDot" class="btn menu-btn" v-if="$props.theme === 'light'" @click="openPanel" />
            <ChatButton :icon="IconThreeDotDark" class="btn menu-btn" v-else-if="$props.theme === 'dark'"
                @click="openPanel" />
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
import IconPhone from '@/components/icon/Phone.vue'
import ChatButton from '@/components/g/ChatButton.vue'
import IconVideoCamera from '@/components/icon/ChatCamera.vue'
import IconThreeDot from '@/components/icon/ThreeDots.vue'
import IconThreeDotDark from '@/components/icon/ThreeDotsDark.vue'
import User from '@/assets/images/user.png'
import IconCaretLeft from '@/components/icon/CarretLeft.vue'
import animation from '@/components/g/TypingAnimation.vue'

const userDetail = ref({
    id: 1, name: 'Username', status: 'online', avatar: User
})

const $props = defineProps({
    selectedUser: {
        type: Object,
        default: () => ({})
    },
    theme: {
        type: String,
        default: 'light'
    }
})

const $emit = defineEmits(['close:windowchat', 'start:call', 'open:InfoPanel'])
const userInfo = ref($props.selectedUser)

const closeChatFunc = () => {
    userInfo.value = null
    $emit('close:windowchat', userInfo.value)
}

watch(() => $props.selectedUser, (newVal) => {
    userInfo.value = newVal
})

const callStart = (type) => {
    $emit('start:call', type)
}

const openPanel = () => {
    $emit('open:InfoPanel')
}
</script>