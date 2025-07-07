<template>
    <div class="page-contacts">
        <div class="page-contacts-main">
            <div class="page-contacts-header px-24 py-24">
                <span>Constacts</span>
                <div class="page-contacts-header-add radius-4 w-30 h-30">
                    <IconAdd class="header-add-icon" v-if="theme === 'light'" />
                    <IconAddDark class="header-add-icon-dark" v-else />
                </div>
            </div>
            <div class="page-contacts-list">
                <Search :theme="theme" :placeholder="'Search contacts...'" v-model="search" />
                <ContactList :theme="theme" :search="search" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import IconAdd from '@/components/icon/Add.vue';
import FavouriteChats from '@/components/g/FavouriteChats.vue'
import IconAddDark from '@/components/icon/AddDark.vue'
import { onMounted, ref, defineProps, inject } from 'vue';
import ContactList from '@/components/g/ContactsList.vue'
const theme = inject('theme')

const search = ref('')
console.log(search.value)
</script>