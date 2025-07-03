<template>
    <div class="favourite-chats">
        <span class="favourite-chats-title mt-24 mb-4">FAVOURITE</span>
        <div class="favourite-chat-item py-16" v-for="(chat, idx) in chats" :key="idx">
            <div class="favourite-chats-avatar mr-8">
                <img :src="chat.img" :alt="chat.name" />
                <div class="favourite-chats-status-dot w-10 h-10" v-if="true"></div>
            </div>
            <div class="favourite-chats-info">
                <h5 class="favourite-chats-name">{{ chat.username }}</h5>
                <span class="favourite-chats-count w-18 h-18">{{ chat.msgNumber }}</span>
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
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' },
    { username: 'Username', img: User, msgNumber: '09' }
]
)
</script>