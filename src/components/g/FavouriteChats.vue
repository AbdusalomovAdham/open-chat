<template>
    <div class="favourite-chats">
        <span class="favourite-chats-title mt-24 mb-4">FAVOURITE</span>
        <template v-for="(chat, idx) in searchChat" :key="idx">
            <div class="favourite-chat-item py-16" v-if="!chat.favorite" @click="selectedUserFunc(chat)">
                <div class="favourite-chats-avatar mr-8">
                    <img :src="chat?.avatar" :alt="chat?.name" />
                    <div class="favourite-chats-status-dot w-10 h-10" v-if="true"></div>
                </div>
                <div class="favourite-chats-info">
                    <h5 class="favourite-chats-name">{{ chat?.user?.username }}</h5>
                    <span class="favourite-chats-count w-18 h-18" v-if="chat?.msgNumber">{{ chat?.msgNumber }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { chatsStore } from '@/store/user/chats';
import { ref, defineProps, computed, defineEmits, watch } from 'vue';

const $props = defineProps({
    search: {
        type: String,
        default: null
    },
    chats: {
        type: Array,
        default: () => ([])
    },
    selectedUser: {
        type: Object,
        default: null
    }
})

const $emit = defineEmits(['selected:user'])
console.log($props.chats)

const searchChat = computed(() => {
    const q = $props.search?.trim().toLowerCase()
    return $props.chats.filter(c => !q || c.username.toLowerCase().includes(q))
})

const selectedUserFunc = (chat) => {
    $emit('selected:user', chat)
}

console.log('chatsss', $props.chats)

watch(() => $props.chats, (newChats) => {
    console.log('chats updated:', newChats)
})
</script>