<template>
    <div class="chat-messages" ref="messagesContainer">
        <template v-if="messageList?.length && messageList[0]?.created_at">
            <div class="chat-start-time">
                <span>{{ formatDate(messageList[0]?.created_at) || '' }}</span>
            </div>

            <div v-for="(msg, idx) in messageList" :key="idx">
                <div class="msg-friend" v-if="!msg.my_message">
                    <div class="msg-owner">
                        <img :src="msg?.avatar" class="w-24 h-24">
                        <span>{{ msg?.username || '' }}</span>
                    </div>

                    <!-- msg-text -->
                    <span>{{ msg.text }}</span>

                    <!-- msg-image -->
                    <!-- <img :src="msg?.content" alt="image" v-else-if="msg?.type === 'image'" class="msg-img"
                        @click="openImageModal(msg?.content)" /> -->

                    <!-- msg-audio -->
                    <!-- <audio v-else-if="msg?.type === 'voice' && msg?.content" :src="msg.content" controls></audio> -->

                    <!-- msg-video -->
                    <!-- <video :src="msg?.content" v-else-if="msg?.type === 'video'" loop playsinline controls
                        class="msg-video">
                    </video> -->

                    <div class="msg-time">
                        <span>{{ formatTime(msg?.created_at) }}</span>
                    </div>
                </div>

                <div class="msg-my" v-else>
                    <span>{{ msg?.text }}</span>
                    <div class="msg-time">
                        <span>{{ formatTime(msg?.created_at) }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="messageList.length === 0">
            <div class="hello-gif">
                <span>Hello</span>
                <p>No messages yet</p>
            </div>
        </template>

        <div v-if="showImageModal" class="modal-overlay" @click="closeImageModal">
            <img :src="enlargedImage" class="modal-img" />
        </div>
    </div>
</template>


<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { defineProps } from 'vue'
import { useChatStore } from '@/store/user/chat';


const chatStore = useChatStore()

const $props = defineProps({
    selectedUser: {
        type: Object,
        default: () => ({})
    },
    myAvatar: {
        type: String,
        default: ''
    }
})

const enlargedImage = ref(null)
const showImageModal = ref(false)

function openImageModal(imageUrl) {
    enlargedImage.value = imageUrl
    showImageModal.value = true
}

function formatTime(datetime) {
    const date = new Date(datetime)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

function formatDate(dateTime) {
    const date = new Date(dateTime)
    const day = date.getDate().toString().padStart(2, '0') // Kun
    const year = date.getFullYear()
    const monthName = date.toLocaleString('default', { month: 'long' })
    const month = date.getMonth().toString().padStart(2, '0')
    const currentYear = new Date().getFullYear()
    if (year === currentYear) {
        return `${day} ${monthName} `
    }
    return `${day} ${month} ${year}`
}


function closeImageModal() { showImageModal.value = false }

const messageList = computed(() => chatStore.messages)

console.log('messages', messageList.value.length)
onMounted(async () => {
    await chatStore.getAllMessage()
    scrollToBottom()

})

const messagesContainer = ref(null)

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTo({
                top: messagesContainer.value.scrollHeight,
                behavior: 'smooth'
            })
        }
    })
}

watch(messageList, () => {
    scrollToBottom()
})

</script>
