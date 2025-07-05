<template>
    <div class="messages-chats">
        <span class="messages-chats-title mt-24 mb-4">MESSAGES</span>
        <div class="messages-chat-item py-16" v-for="(chat, idx) in chats" :key="idx">
            <div class="messages-chats-avatar mr-8">
                <img :src="chat.img" :alt="chat.name" />
                <div class="messages-chats-status-dot w-10 h-10" v-if="true"></div>
            </div>  
            <div class="messages-chats-info">
                <h5 class="messages-chats-name">{{ chat.username }}</h5>
                <span class="messages-chats-count w-18 h-18">{{ chat.msgNumber }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import User from '@/assets/images/user.png'
const chats = ref([
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' },
]
)
</script>