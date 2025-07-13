<template>
    <div class="call-list px-24">
        <div class="call-item py-16 " v-for="call in filterCalls" :key="call?.id">
            <div class="call-content">
                <img :src="call?.avatar" class="avatar w-32 h-32" />
                <div class="call-info">
                    <p class="name">{{ call?.name }}</p>
                    <p class="date">{{ formatDate(call?.date) }}</p>
                </div>
            </div>
            <div class="call-icons">
                <ArrowDownRed v-if="call?.status === 'missed'" />
                <ArrowUp v-else-if="call?.status === 'outgoing' && call?.isAnswered" />
                <ArrowUpRed v-else-if="call?.status === 'outgoing' && !call?.isAnswered" />
                <ArrowDown v-else />
                <IconPhone v-if="call?.type === 'audio'" class="icon-call" />
                <IconCamera v-else class="icon-call" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import User from '@/assets/images/user.png';
import IconPhone from '@/components/icon/AudioCall.vue'
import IconCamera from '@/components/icon/VideoCamera.vue'
import ArrowDown from '../icon/ArrowDown.vue';
import ArrowDownRed from '../icon/ArrowDownRed.vue';
import ArrowUp from '../icon/ArrowUp.vue';
import ArrowUpRed from '../icon/ArrowUpRed.vue';

const $props = defineProps({
    currentFilter: {
        type: String,
        default: 'all'
    }
})

const calls = ref([
    {
        id: 1,
        name: 'William Jury',
        avatar: User,
        date: '2025-07-07T12:10:00',
        type: 'audio',
        status: 'received',
        isAnswered: true
    },
    {
        id: 2,
        name: 'Jack Underhill',
        avatar: User,
        date: '2025-07-07T18:48:00',
        type: 'video',
        status: 'missed',
        isAnswered: false
    },
    {
        id: 3,
        name: 'Sophia Carter',
        avatar: User,
        date: '2025-06-30T09:25:00',
        type: 'audio',
        status: 'outgoing',
        isAnswered: false
    },
    {
        id: 4,
        name: 'Liam O’Connor',
        avatar: User,
        date: '2022-06-29T22:05:00',
        type: 'video',
        status: 'received',
        isAnswered: true
    },
    {
        id: 5,
        name: 'Amelia Brooks',
        avatar: User,
        date: '2025-06-28T15:42:00',
        type: 'audio',
        status: 'missed',
        isAnswered: false
    },
    {
        id: 6,
        name: 'Noah Spencer',
        avatar: User,
        date: '2025-06-27T07:57:00',
        type: 'video',
        status: 'received',
        isAnswered: true
    }
])

//calls' date
const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const timePart = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
    if (date.toDateString() === today.toDateString()) {
        return `Today, ${timePart}`
    }
    const dateOptions = {
        day: '2-digit',
        month: 'short'
    }
    if (date.getFullYear() !== today.getFullYear()) {
        dateOptions.year = 'numeric'
    }
    const datePart = date.toLocaleDateString('en-US', dateOptions)
    return `${datePart}, ${timePart}`
}

// filter calls
const filterCalls = computed(() => {
    const f = $props.currentFilter.trim().toLocaleLowerCase()
    let result = []
    if (f === 'all') {
        result = calls.value
    } else if (f === 'incoming') {
        result = calls.value.filter(c => c.status !== 'outgoing')
    } else {
        result = calls.value.filter(c => c.status === f)
    }

    return result.sort((a, b) => new Date(b.date) - new Date(a.date))
})
</script>