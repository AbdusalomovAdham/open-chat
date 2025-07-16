<template>
    <div class="page-contacts ws-350">
        <div class="page-contacts-main">
            <HeaderPage :theme="theme" :title="'Contacts'" />
            <div class="page-contacts-list">
                <Search :theme="theme" :placeholder="'Search contacts...'" v-model="search" />
                <ContactList :theme="theme" :search="search" :selectedUser="selectedUser" :contacts="chats"
                    @selected:user="selectedUserHandle" />
            </div>
        </div>
    </div>
</template>

<script setup>
import Search from '@/components/g/Search.vue';
import { onMounted, ref, defineProps, inject } from 'vue';
import HeaderPage from '@/components/g/HeaderPage.vue'
import ContactList from '@/components/g/ContactsList.vue'
const theme = inject('theme')
const selectedUser = inject('selectedUser')
const search = ref('')
const chats = inject('chats')

const selectedUserHandle = (contact) => {
    selectedUser.value = contact
}

</script>