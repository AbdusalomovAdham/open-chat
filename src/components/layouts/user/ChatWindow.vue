<template>
    <div class="chat-window" :class="[show]">
        <transition name="slide-fade">
            <div class="window-content" v-if="selectedUser">
                <ChatWindowHeader :selectedUser="selectedUser" @close:windowchat="closeChat" />
                <ChatWindowMessages :selectedUser="selectedUser" />
                <ChatWindowInput />
            </div>
        </transition>
    </div>
</template>


<script setup>
import ChatWindowHeader from '@/components/g/ChatWindowHeader.vue'
import ChatWindowInput from '@/components/g/CharWindowInput.vue'
import ChatWindowMessages from '@/components/g/ChatWindowMessages.vue'
import { inject, ref, onUpdated, onMounted, watch } from 'vue';
const selectedUser = inject('selectedUser')
const show = ref('')

watch(selectedUser, (val) => {
    show.value = val ? 'show' : ''
})

const chatStatus = ref(true)
const closeChat = (userInfo) => {
    selectedUser.value = null
    console.log('close', userInfo)
}

const chatContainer = ref(null)


onUpdated(() => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
})
</script>