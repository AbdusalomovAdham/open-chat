<template>
    <div class="chat-window" :class="[show]">
        <transition name="slide-fade">
            <div class="window-content" v-if="uid" ref="chatContainer">
                <ChatWindowHeader :uid="uid" @close:windowchat="closeChat" :theme="theme" @start:call="callStartFunc"
                    @open:InfoPanel="openInfoPanel" />
                <ChatWindowMessages :uid="uid" :theme="theme" />
                <ChatWindowInput :uid="uid" />
            </div>
        </transition>
    </div>
</template>

<script setup>
import ChatWindowHeader from '@/components/g/ChatWindowHeader.vue'
import ChatWindowInput from '@/components/g/ChatWindowInput.vue'
import ChatWindowMessages from '@/components/g/ChatWindowMessages.vue'
import { ref, watch, onUpdated, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/store/user/chat'

const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()

const theme = inject('theme')
const callStart = inject('callStart')
const callType = inject('callType')
const infoPanel = inject('infoPanel')

const showChatWindow = ref(false)
const uid = ref(route.params.uid || null)
const show = ref(uid.value ? 'show' : '')

const chatContainer = ref(null)

onUpdated(() => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
})

watch(
    () => route.params.uid,
    (newUid) => {
        uid.value = newUid
        show.value = newUid ? 'show' : ''
    }
)

const closeChat = () => {
    const fullPath = route.fullPath
    const withoutUid = fullPath.replace(`/${route.params.uid}`, '')
    router.push(withoutUid)
    setTimeout(() => {
        chatStore.userDetail = ''
    }, 50)
}


const callStartFunc = (type) => {
    if (type === 'audio' || type === 'video') {
        callType.value = type
        callStart.value = true
    }
}

const openInfoPanel = () => {
    infoPanel.value = true
}
</script>