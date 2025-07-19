<template>
    <div class="page-groups ws-350">
        <HeaderPage :theme="theme" :title="'Groups'" :icon="icon" @show:groupCard="showGroupCard" />
        <Search :theme="theme" :placeholder="'Search group...'" v-model="search" />
        <GroupList :search="search" :groups="groups" :selectedUser="selectedUser" @selected:user="selectedUserHandle"
            @call:start="callStartFunc" />
    </div>
</template>

<script setup>
import { inject, ref, reject } from 'vue'
import HeaderPage from '@/components/g/HeaderPage.vue';
import Search from '@/components/g/Search.vue';
import GroupList from '@/components/g/GroupList.vue'

const search = ref('')
const icon = ref('group')
const theme = inject('theme')
const groups = inject('groups')

const selectedUser = inject('selectedUser')
const show = inject('showGroupCard')
const callStart = inject('callStart')

const selectedUserHandle = (group) => {
    selectedUser.value = group
    console.log('groups', selectedUser.value)
}

const showGroupCard = (showCard) => {
    show.value = showCard
    console.log('show.value', show.value)
}

const callStartFunc = (callType) => {
    callStart.value = callType
}

</script>