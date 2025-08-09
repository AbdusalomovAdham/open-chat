<template>
  <div class="chat-window-header pa-16">
    <div class="window-header-user-info">
      <div class="close-chat" @click="closeChatFunc()">
        <IconCaretLeft />
      </div>
      <div class="user-avatar">
        <img class="w-40 h-40" :src="userInfo?.avatar" alt="User Avatar">
      </div>
      <div class="user-details">
        <div class="user-name" @click="openPanel">{{ userInfo?.username }}</div>
        <div class="user-status">
          <span v-if="!isTyping">{{ isOnline }}</span>
          <span class="typing" v-if="isTyping">Typing
            <animation />
          </span>
        </div>
      </div>
    </div>

    <div class="action-buttons">
      <ChatButton :icon="IconPhone" class="btn call-btn" @click="audioCall('audio')" />
      <ChatButton :icon="IconVideoCamera" class="btn video-btn" @click="videoCall('video')" />
      <ChatButton :icon="IconThreeDot" class="btn menu-btn" v-if="$props.theme === 'light'" @click="openPanel" />
      <ChatButton :icon="IconThreeDotDark" class="btn menu-btn" v-else-if="$props.theme === 'dark'"
        @click="openPanel" />
    </div>
  </div>
</template>

<script setup>
import IconPhone from '@/components/icon/Phone.vue'
import ChatButton from '@/components/g/ChatButton.vue'
import IconVideoCamera from '@/components/icon/ChatCamera.vue'
import IconThreeDot from '@/components/icon/ThreeDots.vue'
import IconThreeDotDark from '@/components/icon/ThreeDotsDark.vue'
import IconCaretLeft from '@/components/icon/CarretLeft.vue'
import animation from '@/components/g/TypingAnimation.vue'
import { defineProps, defineEmits, computed, onMounted } from 'vue'
import { useChatStore } from '@/store/user/chat'
import { useCallStore } from '@/store/user/call'
import { useRoute } from 'vue-router'

const route = useRoute()
const chatStore = useChatStore()
const callStore = useCallStore()
const $props = defineProps({
  theme: {
    type: String,
    default: 'light'
  }
})

const isTyping = computed(() => callStore.typingUser)
const $emit = defineEmits(['close:windowchat', 'start:call', 'open:InfoPanel'])
const userInfo = computed(() => chatStore.userDetail)

const closeChatFunc = async () => { $emit('close:windowchat', userInfo.value) }

const tagetUid = computed(() => route.params.uid)

const isOnline = computed(() => { return callStore.onlineUsers.includes(tagetUid.value) ? 'Online' : ' Offline'; })

function audioCall() { callStore.call('audio', tagetUid.value) }

function videoCall() { callStore.call('video', tagetUid.value) }

const openPanel = () => { $emit('open:InfoPanel') }

onMounted(async () => {
  if (!chatStore.userDetail) await chatStore.fetchInfo()
})
</script>