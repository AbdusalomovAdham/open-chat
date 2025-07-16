<template>
    <div class="page-chats ws-350">
        <div class="page-chats-main">
            <HeaderPage :theme="theme" :title="'Chats'" />
            <div class="page-chats-list">
                <Search :theme="theme" :placeholder="'Search chats...'" v-model="search" />
                <FavouriteChats :search="search" :chats="chats" :selectedUser="selectedUser"
                    @selected:user="handleSelectedUser" />
                <MessagesChats :search="search" :chats="chats" :selectedUser="selectedUser"
                    @selected:user="handleSelectedUser" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import FavouriteChats from '@/components/g/FavouriteChats.vue'
import MessagesChats from '@/components/g/MessagesChats.vue'
import HeaderPage from '@/components/g/HeaderPage.vue'
import { inject, ref, defineEmits } from 'vue';

const theme = inject('theme')
const chats = inject('chats')
const selectedUser = inject('selectedUser')
const search = ref('')
const $emit = defineEmits(['selected:user'])


const handleSelectedUser = (chat) => {
    console.log('chat', chat)
    selectedUser.value = chat
}

</script>