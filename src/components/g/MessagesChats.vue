<template>
    <div class="messages-chats">
        <span class="messages-chats-title mt-24 mb-4">MESSAGES</span>
        <template v-for="(chat, idx) in $props.chats" :key="idx">
            <div class="messages-chat-item py-16" v-if="chat.favorite" @click="selectedUserFunc(chat)">
                <div class="messages-chats-avatar mr-8">
                    <img :src="chat?.avatar" :alt="chat?.name" />
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
import User from '@/assets/images/user.png'
import { ref, defineProps, computed, inject } from 'vue';
const $props = defineProps({
    chats: {
        type: Array,
        default: () => ([])
    }
})

const selectedUser = inject('selectedUser')

const selectedUserFunc = (chat) => {
    selectedUser.value = chat
}

</script>