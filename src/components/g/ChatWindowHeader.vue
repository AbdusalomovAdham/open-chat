<template>
    <div class="chat-window-header pa-16">
        <div class="window-header-user-info">
            <div class="close-chat" @click="closeChatFunc()">
                <IconCaretLeft />
            </div>
            <div class="user-avatar">
                <img class="w-40 h-40" :src="userDetail.avatar" alt="User Avatar">
            </div>
            <div class="user-details">
                <div class="user-name">{{ $props.selectedUser?.username || $props.selectedUser?.name }} 👋</div>
                <div class="user-status">{{ $props.selectedUser?.status }}</div>
            </div>
        </div>

        <div class="action-buttons">
            <ChatButton :icon="IconPhone" class="btn call-btn" />
            <ChatButton :icon="IconVideoCamera" class="btn video-btn" />
            <ChatButton :icon="IconThreeDot" class="btn menu-btn" />
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, defineEmits } from 'vue'
import IconPhone from '@/components/icon/Phone.vue'
import ChatButton from '@/components/g/ChatButton.vue'
import IconVideoCamera from '@/components/icon/ChatCamera.vue'
import IconThreeDot from '@/components/icon/ThreeDots.vue'
import User from '@/assets/images/user.png'
import IconCaretLeft from '@/components/icon/CarretLeft.vue'

const userDetail = ref({
    id: 1, name: 'Username', status: 'online', avatar: User
})

const $props = defineProps({
    selectedUser: {
        type: Object,
        default: () => ({})
    }
})

const $emit = defineEmits(['close:windowchat'])
const userInfo = ref($props.selectedUser)

const closeChatFunc = () => {
    userInfo.value = null
    $emit('close:windowchat', userInfo.value)
}
console.log('chat window', $props.selectedUser)

watch(() => $props.selectedUser, (newVal) => {
    userInfo.value = newVal
})
</script>