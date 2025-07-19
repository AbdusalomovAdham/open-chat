<template>
    <div class="page-chats ws-350">
        <div class="page-chats-main">
            <HeaderPage :theme="theme" :title="'Chats'" @show:addCard="showCardFunc" />
            <div class=" page-chats-list">
                <Search :theme="theme" :placeholder="'Search chats...'" v-model="search" />
                <FavouriteChats :search="search" :chats="myChats" :selectedUser="selectedUser"
                    @selected:user="handleSelectedUser" />
                <MessagesChats :search="search" :chats="myChats" :selectedUser="selectedUser"
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
import { inject, onMounted, ref } from 'vue';
import useChatsStore from '@/store/user/chats/index'

const userChatStore = useChatsStore()


const theme = inject('theme')
const chats = inject('chats')
const selectedUser = inject('selectedUser')
const showAddCard = inject('showAddFriendCard')

const search = ref('')

const handleSelectedUser = (chat) => {
    console.log('chat', chat)
    selectedUser.value = chat
}

const showCardFunc = (show) => {
    showAddCard.value = show
}

const myChats = ref([])

onMounted(async () => {
    const data = await userChatStore.chatsList()
    myChats.value = data
    myChats.value.forEach(chat => {
        console.log('user:', chat.user)
    })

})

</script>