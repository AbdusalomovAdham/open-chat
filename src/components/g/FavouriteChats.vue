<template>
    <div class="favourite-chats">
        <span class="favourite-chats-title mt-24 mb-4">FAVOURITE</span>
        <template v-for="(chat, idx) in searchChat" :key="idx">
            <div class="favourite-chat-item py-16" v-if="!chat?.favorite" @click="selectedUserFunc(chat)">
                <div class="favourite-chats-avatar mr-8">
                    <img :src="chat?.avatar" :alt="chat?.name" />
                    <div class="favourite-chats-status-dot w-10 h-10" v-if="isUserOnline(chat?.uid)"></div>
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
import { useCallStore } from '@/store/user/call';
import router from '@/router';
import { useRoute } from 'vue-router'

const storeChats = useChatsStore()
const callStore = useCallStore()
const route = useRoute()

const $props = defineProps({
    search: {
        type: String,
        default: null
    }
})

const tagetUid = computed(() => route.params.uid)
const $emit = defineEmits(['selected:user'])
const chats = ref([])

const fetchChats = async () => {
    try {
        chats.value = await storeChats.fetchChatsList()
        console.log(callStore.onlineUsers)
    } catch (e) {
        console.error(e)
    }
}

const onlineUserList = ref([])
const fetchOnlineUser = () => {
    onlineUserList.value = callStore.onlineUsers
}
const isUserOnline = (uid) => {
    return callStore?.onlineUsers?.includes(uid)
}


const searchChat = computed(() => {
    const q = $props.search?.trim().toLowerCase()
    const list = chats.value || []
    fetchOnlineUser()
    return list.filter(c => !q || c.username?.toLowerCase().includes(q))
})

const selectedUserFunc = (chat) => {
    $emit('selected:user', chat)
    router.push(`/user/chats/${chat.uid}`)
}

onMounted(async () => {
    fetchOnlineUser()
    fetchChats()
})
</script>