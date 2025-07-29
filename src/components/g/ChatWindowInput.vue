<template>
    <div class="chat-window-input pa-24">
        <div class="input-action-buttons">
            <ChatButton :icon="IconPlus" class="btn plus-btn" />
            <ChatButton :icon="IconMicrophone" class="btn microphone-btn" />
        </div>
        <div class="input-section">
            <input type="text" placeholder="Enter Your Message..." v-model="newMessage">
            <IconSend class="send-icon" @click="send" />
        </div>
    </div>
</template>

<script setup>
import ChatButton from '@/components/g/ChatButton.vue'
import IconMicrophone from '@/components/icon/Microphone.vue'
import IconPlus from '@/components/icon/ChatWindowPlus.vue'
import IconSend from '@/components/icon/Send.vue'
import { onMounted, ref } from 'vue'
import { useChatStore } from '@/store/user/chat'

const chatStore = useChatStore()
const newMessage = ref('')

const send = async () => {
    chatStore.sendMessage(newMessage.value)
    newMessage.value = ''
    return
}

onMounted(() => {
    chatStore.getAllMessage()
})
</script>