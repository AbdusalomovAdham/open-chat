<template>
    <div class="page-chats">
        <div class="page-chats-main">
            <div class="page-chats-header px-24 py-24">
                <span>Chats</span>
                <div class="page-chats-header-add radius-4 w-30 h-30">
                    <IconAdd class="header-add-icon" v-if="theme === 'light'" />
                    <IconAddDark class="header-add-icon-dark" v-else />
                </div>
            </div>
            <div class="page-chats-list">
                <Search :theme="theme" />
                <FavouriteChats />
                <MessagesChats />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import IconAdd from '@/components/icon/Add.vue';
import FavouriteChats from '@/components/g/FavouriteChats.vue'
import MessagesChats from '@/components/g/MessagesChats.vue'
import IconAddDark from '@/components/icon/AddDark.vue'
import { onMounted, ref, defineProps, inject } from 'vue';

const theme = inject('theme')
console.log('theme', theme)
</script>