<template>
    <div class="chat-window" :class="[show]">
        <transition name="slide-fade">
            <div class="window-content" v-if="selectedUser" ref="chatContainer">
                <ChatWindowHeader :selectedUser="selectedUser" @close:windowchat="closeChat" :theme="theme"
                    @start:call="callStartFunc" @open:InfoPanel="openInfoPanel" />
                <ChatWindowMessages :selectedUser="selectedUser" :theme="theme" />
                <ChatWindowInput />
            </div>
        </transition>
    </div>
</template>


<script setup>
import ChatWindowHeader from '@/components/g/ChatWindowHeader.vue'
import ChatWindowInput from '@/components/g/ChatWindowInput.vue'
import ChatWindowMessages from '@/components/g/ChatWindowMessages.vue'
import { inject, ref, onUpdated, watch } from 'vue';

const selectedUser = inject('selectedUser')
const theme = inject('theme')
const callStart = inject('callStart')
const callType = inject('callType')
const infoPanel = inject('infoPanel')

const show = ref('')
const chatStatus = ref(true)

const closeChat = (userInfo) => {
    selectedUser.value = null
    console.log('close', userInfo)
}

const chatContainer = ref(null)

const callStartFunc = (type) => {
    if (type === 'audio' || type === 'video') {
        callType.value = type
        callStart.value = true
    }
}

onUpdated(() => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
})

watch(selectedUser, (val) => {
    show.value = val ? 'show' : ''
})

const openInfoPanel = () => {
    infoPanel.value = true
}

</script>