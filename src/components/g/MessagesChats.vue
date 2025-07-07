<template>
    <div class="messages-chats">
        <span class="messages-chats-title mt-24 mb-4">MESSAGES</span>
        <template v-for="(chat, idx) in chats" :key="idx">
            <div class="messages-chat-item py-16" v-if="chat.favorite">
                <div class="messages-chats-avatar mr-8">
                    <img :src="chat?.img" :alt="chat?.name" />
                    <div class="messages-chats-status-dot w-10 h-10" v-if="true"></div>
                </div>
                <div class="messages-chats-info">
                    <h5 class="messages-chats-name">{{ chat?.username }}</h5>
                    <span class="messages-chats-count w-18 h-18">{{ chat?.msgNumber }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import User from '@/assets/images/user.png'
const chats = ref([
    { username: 'Amelia Jury', img: User, msgNumber: '3', favorite: false },
    { username: 'Anthony Ledonne', img: User, msgNumber: '7', favorite: true },
    { username: 'Brian Richards', img: User, msgNumber: '0', favorite: true },
    { username: 'Charles Pinard', img: User, msgNumber: '12', favorite: false },
    { username: 'Fenrick Beriwck', img: User, msgNumber: '9', favorite: false },
    { username: 'Fidel Pinard', img: User, msgNumber: '5', favorite: true },
    { username: 'Elena Brown', img: User, msgNumber: '2', favorite: false },
    { username: 'Sophia Clark', img: User, msgNumber: '10', favorite: true }
])
</script>