<template>
    <div class="page-chats ws-350">
        <div class="page-chats-main">
            <HeaderPage :theme="theme" :title="'Chats'"/>
            <div class="page-chats-list">
                <Search :theme="theme" :placeholder="'Search chats...'" v-model="search" />
                <FavouriteChats :search="search" />
                <MessagesChats :search="search" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import FavouriteChats from '@/components/g/FavouriteChats.vue'
import MessagesChats from '@/components/g/MessagesChats.vue'
import HeaderPage from '@/components/g/HeaderPage.vue'
import { inject, ref } from 'vue';

const theme = inject('theme')
const search = ref('')
console.log('theme', theme)
</script>