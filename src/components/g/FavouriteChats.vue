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
                    <h5 class="favourite-chats-name">{{ chat?.username }}</h5>
                    <span class="favourite-chats-count w-18 h-18" v-if="chat?.msgNumber">{{ chat?.msgNumber }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits, watch, onMounted } from 'vue';
import { useChatsStore } from '@/store/user/chats/index';
import router from '@/router/routes';

const storeChats = useChatsStore()
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
const chats = ref([])

const fetchChats = async () => {
    try {
        chats.value = await storeChats.fetchChatsList()
        console.log('chats.value', chats.value)
    } catch (e) {
        console.error(e)
    }
}


const searchChat = computed(() => {
    const q = $props.search?.trim().toLowerCase()
    const list = chats.value || []
    return list.filter(c => !q || c.username?.toLowerCase().includes(q))
})
console.log('search chat', searchChat.value)

const selectedUserFunc = (chat) => {
    $emit('selected:user', chat)
    router.push(`/user/chats/${chat.uid}`)
}

watch(() => $props.chats, (newChats) => {
    console.log('chats updated:', newChats)
})

onMounted(() => {
    fetchChats()
})
</script>