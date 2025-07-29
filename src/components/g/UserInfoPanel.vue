<template>
    <transition name="slide-fade">
        <div class="user-info-panel" v-if="show">
            <div class="info-panel-wrapper">
                <div class="info-panel-header">
                    <span>Profile</span>
                    <div class="close" @click="closePanel()">
                        <IconClose v-if="theme === 'light'" />
                        <IconCloseDark v-else />
                    </div>
                </div>
                <div class="info-panel-main">
                    <div class="user-main-info">
                        <div class="user-avatar">
                            <img :src="selectedUser?.avatar" alt="user avatar" class="w-80 h-80">
                        </div>
                        <h4 class="user-name">{{ selectedUser?.username }}</h4>
                        <span class="user-status">{{ selectedUser?.status || '' }}</span>
                    </div>
                </div>
                <div class="panel-icon">
                    <div class="icon chat-icon" @click="closePanel">
                        <IconChat v-if="theme === 'light'" />
                        <IconChatDark v-else />
                    </div>
                    <div class="icon star-icon" @click="favoriteFunc()" :class="{ 'active-star': favorite !== false }">
                        <IconStar v-if="!favorite && theme === 'light'" />
                        <IconStarActive v-else-if="favorite || theme !== 'light'" />
                    </div>
                    <div class=" block-icon icon" @click="blockFunc()" :class="{ 'active-block': block !== false }">
                        <IconProhibit v-if="block" />
                        <IconProhibitActive v-else />
                    </div>
                </div>
                <div class="panel-personal-info">
                    <h5 class="info-title">Personal Information</h5>
                    <div class="personal-info-main">
                        <div class="personal-info-content">
                            <h4>Phone:</h4>
                            <span>{{ "+" + selectedUser?.phone_number || '-' }}</span>
                        </div>
                        <div class="personal-info-content">
                            <h4>Address:</h4>
                            <span>{{ selectedUser?.address || '-' }}</span>
                        </div>
                        <div class="personal-info-content">
                            <h4>Email:</h4>
                            <span>{{ selectedUser?.email || '-' }}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-settings">
                    <span class="setting-title">
                        Settings
                    </span>
                    <div class="setting-mute">
                        <ToggleSwitch />
                        <span>Mute notifications</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import IconClose from '@/components/icon/Close.vue'
import IconCloseDark from '@/components/icon/CloseDark.vue'
import IconChat from '@/components/icon/Chat.vue'
import IconChatDark from '@/components/icon/ChatDark.vue'
import IconStar from '@/components/icon/Star.vue'
import IconStarActive from '@/components/icon/StarActive.vue'
import IconProhibitActive from '@/components/icon/ProhibitActive.vue'
import IconProhibit from '@/components/icon/Prohibit.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { ref, defineProps, computed, defineEmits, watch, inject } from 'vue';
import { useChatStore } from '@/store/user/chat'

const chatStore = useChatStore()
const selectedUser = computed(() => chatStore.userDetail)
const favorite = ref(false)
const block = ref(false)
const show = ref(false)
const theme = inject('theme')

console.log('select', selectedUser.value)

const blockFunc = () => {
    block.value = !block.value
    if (block.value) alert('User blocked!')
    else alert('User unblocked')
}

const favoriteFunc = () => {
    favorite.value = !favorite.value
}

const $props = defineProps({
    infoPanel: Boolean
})

const $emit = defineEmits(['update:infoPanel'])

watch(() => $props.infoPanel, (val) => { show.value = val })

watch(show, (val) => { $emit('update:infoPanel', val) })

const closePanel = () => {
    show.value = false
}



</script>