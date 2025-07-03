<template>
    <div class="page-chats">
        <div class="page-chats-main">
            <div class="page-chats-header px-24 py-24">
                <span>Chats</span>
                <div class="page-chats-header-add radius-4 w-30 h-30">
                    <IconAdd />
                </div>
            </div>
            <div class="page-chats-list">
                <Search />
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
</script>