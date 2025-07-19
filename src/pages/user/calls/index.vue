<template>
    <div class="page-calls ws-350">
        <HeaderPage :theme="theme" :title="'Calls'" @show:addCard="showCardFunc" />
        <CallsFilter class="mb-16" @change="currentFilter = $event" />
        <CallList :currentFilter="currentFilter" @start:call="callStartFunc" />
    </div>
</template>

<script setup>
import HeaderPage from '@/components/g/HeaderPage.vue';
import CallsFilter from '@/components/g/CallsFilter.vue';
import CallList from '@/components/g/CallList.vue';
import { inject, ref } from 'vue';

const currentFilter = ref('all')

const theme = inject('theme')
const showAddCard = inject('showAddFriendCard')
const callStart = inject('callStart')
const callType = inject('callType')

const showCardFunc = (show) => {
    showAddCard.value = show
}

const callStartFunc = (type) => {
    if (type === 'audio' || type === 'video') {
        callType.value = type
        callStart.value = true
    }
}
</script>