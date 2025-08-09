<template>
    <div class="page-contacts ws-350">
        <div class="page-contacts-main">
            <HeaderPage :theme="theme" :title="'Contacts'" @show:addCard="showCardFunc" />
            <div class="page-contacts-list">
                <Search :theme="theme" :placeholder="'Search contacts...'" v-model="search" />
                <ContactList :theme="theme" :search="search" :selectedUser="selectedUser" :contacts="chats"
                    @selected:user="selectedUserHandle" @call:start="startCall" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import { ref, inject, defineEmits } from 'vue';
import HeaderPage from '@/components/g/HeaderPage.vue'
import ContactList from '@/components/g/ContactsList.vue'
import { useChatStore } from '@/store/user/chat'
const chatStore = useChatStore()
const $emit = defineEmits(['call:start'])

const theme = inject('theme')
const selectedUser = inject('selectedUser')
const showAddCard = inject('showAddFriendCard')
const callStart = inject('callStart')
const callType = inject('callType')
const search = ref('')

const selectedUserHandle = async (contact) => {
    selectedUser.value = contact
    await chatStore.getAllMessage()
}

const showCardFunc = (show) => {
    showAddCard.value = show
}

const startCall = (type) => {
    if (type === 'video' || type === 'audio') {
        callStart.value = true
        callType.value = type
    }
}
</script>