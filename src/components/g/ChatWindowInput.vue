<template>
    <div class="chat-window-input pa-24">
        <div class="input-action-buttons">
            <div class="send-file">
                <ChatButton :icon="IconPlus" class="btn plus-btn" />
                <input type="file" class="hiddent-input" @change="handleFileUpload" name="file">
            </div>
            <ChatButton :icon="IconMicrophone" class="btn microphone-btn" />
        </div>
        <div class="input-section">
            <input type="text" placeholder="Enter Your Message..." v-model="newMessage" @keyup.enter="send"
                @input="handleTyping" name="message">
            <IconSend class="send-icon" @click="send" />
        </div>
    </div>
</template>

<script setup>
import ChatButton from '@/components/g/ChatButton.vue'
import IconMicrophone from '@/components/icon/Microphone.vue'
import IconPlus from '@/components/icon/ChatWindowPlus.vue'
import IconSend from '@/components/icon/Send.vue'
import { computed, onMounted, ref } from 'vue'
import { useChatStore } from '@/store/user/chat'
import { useCallStore } from '@/store/user/call'
import { useRoute } from 'vue-router'

const route = useRoute()
const callStore = useCallStore()
const chatStore = useChatStore()
const newMessage = ref('')
const uid = computed(() => route.params.uid)

const send = async () => {
    await chatStore.sendMessage(newMessage.value)
    newMessage.value = ''
}

const handleFileUpload = async (event) => {
    try {
        const file = event.target.files[0]
        console.log(file)
        if (!file) return

        let messageType = 'file';
        if (file.type.startsWith('image/')) messageType = 'image';
        else if (file.type.startsWith('video/')) messageType = 'video';
        else if (file.type.startsWith('audio/')) messageType = 'audio';

        const formData = new FormData()
        formData.append('file', file)
        formData.append('user_uid', uid.value)
        formData.append('message_type', messageType)
        formData.append('file_name', file.name)
        await chatStore.sendFile(formData)
        console.log(typeof file.size.toString())
        await chatStore.sendFile({
            fileName: file.name,
            fileType: file.type,
            user_uid: uid.value,
            fileData: file.size,
            message_type: messageType
        })
    } catch (err) {
        console.error('File upload error:', err);
    }
};



async function handleTyping() {
    setTimeout(() => {
        if (newMessage.value) {
            callStore.showTyping(uid.value)
        }
    }, 100)

}



onMounted(() => {
    chatStore.getAllMessage()
})
</script>