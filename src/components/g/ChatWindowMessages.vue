<template>
    <div class="chat-messages">

        <template v-if="$props.selectedUser?.messages?.length">
            <div class="chat-start-time">
                <span>{{ $props.selectedUser?.chat_start_time }}</span>
            </div>

            <div v-for="(msg, idx) in $props.selectedUser?.messages" :key="idx">
                <div class="msg-friend" v-if="!msg.fromMe">
                    <div class="msg-owner">
                        <img :src="msg?.avatar" alt="user-avatar" class="w-24 h-24">
                        <span>{{ msg?.username }}</span>
                    </div>

                    <!-- msg-text -->
                    <span v-if="msg?.type === 'text'">{{ msg?.content }}</span>

                    <!-- msg-image -->
                    <img :src="msg?.content" alt="image" v-else-if="msg?.type === 'image'" class="msg-img"
                        @click="openImageModal(msg?.content)" />
                    <!-- msg-audio -->
                    <audio v-else-if="msg?.type === 'voice' && msg?.content" :src="msg.content" controls></audio>

                    <!-- msg-video -->
                    <video :src="msg?.content" v-else-if="msg?.type === 'video'" loop playsinline controls
                        class="msg-video">
                    </video>

                    <div class="msg-time">
                        <span>{{ msg?.time }}</span>
                    </div>
                </div>

                <div class="msg-my" v-else>
                    <span>{{ msg?.content }}</span>
                    <div class="msg-time">
                        <span>{{ msg?.time }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="hello-gif">
                <span>Hello</span>
            </div>
        </template>

        <div v-if="showImageModal" class="modal-overlay" @click="closeImageModal">
            <img :src="enlargedImage" class="modal-img" />
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import User from '@/assets/images/user.png'

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

function closeImageModal() {
    showImageModal.value = false
}
</script>
