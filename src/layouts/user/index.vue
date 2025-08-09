<template>
    <div :class="['user-layout', theme]">
        <Sidebar :theme="theme" />
        <router-view></router-view>
        <ChatWindow :theme="theme" class="chat-main" />
        <ModeButton :theme="theme" @toggle="toggleTheme" />
        <AddFriendCard v-model:show="showCard" />
        <AddGroupCard v-model:show="groupCard" />
        <CallAudio v-model:callStart="callStart" v-model:callType="callType" />
        <UserInfoPanel v-model:infoPanel="infoPanel" :theme="theme" />
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import Sidebar from '@/components/layouts/user/Sidebar.vue';
import ChatWindow from '@/components/layouts/user/ChatWindow.vue'
import ModeButton from '@/components/g/ModeButton.vue';
import AddFriendCard from '@/components/g/AddFriendCard.vue';
import AddGroupCard from '@/components/g/AddGroupCard.vue'
import CallAudio from '@/components/g/Call.vue'
import UserInfoPanel from '@/components/g/UserInfoPanel.vue'

const theme = ref('light')
const selectedUser = ref(null)
const showCard = ref(false)
const groupCard = ref(false)
const callStart = ref(false)
const callType = ref('audio')
const infoPanel = ref(false)

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
}

onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) theme.value = saved
})


provide('theme', theme)
provide('selectedUser', selectedUser)
provide('showAddFriendCard', showCard)
provide('showGroupCard', groupCard)
provide('callStart', callStart)
provide('callType', callType)
provide('infoPanel', infoPanel)


</script>