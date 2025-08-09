<template>
    <div class="call-list px-24">
        <div class="call-item py-16 " v-for="call in filterCalls" :key="call?.id">
            <div class="call-content">
                <img :src="call?.user?.avatar" class="avatar w-32 h-32" />
                <div class="call-info">
                    <p class="name">{{ call?.user?.username }}</p>
                    <p class="date">{{ formatDate(call?.created_at) }}</p>
                </div>
            </div>
            <div class="call-icons" @click="startCall(call?.type)">
                <ArrowDownRed v-if="call?.status === 'missed' && call?.user?.uid === call?.caller_uid" />
                <ArrowUpRed v-else-if="call?.status === 'missed' && call?.user?.uid !== call?.caller_uid" />
                <ArrowUp v-else-if="call?.status === 'answered' && call?.user?.uid === call?.reciver_uid" />
                <ArrowDown v-else />
                <IconPhone v-if="call?.type === 'audio'" class="icon-call" />
                <IconCamera v-else class="icon-call" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmits, onMounted } from 'vue';
import User from '@/assets/images/user.png';
import IconPhone from '@/components/icon/AudioCall.vue'
import IconCamera from '@/components/icon/VideoCamera.vue'
import ArrowDown from '../icon/ArrowDown.vue';
import ArrowDownRed from '../icon/ArrowDownRed.vue';
import ArrowUp from '../icon/ArrowUp.vue';
import ArrowUpRed from '../icon/ArrowUpRed.vue';
import { useCallsStore } from '@/store/user/calls';

const callsStore = useCallsStore()
const $props = defineProps({
    currentFilter: {
        type: String,
        default: 'all'
    },
})

const $emit = defineEmits(['start:call'])
const callsList = computed(() => callsStore.callList)

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
        result = callsList.value
    } else if (f === 'incoming') {
        result = callsList.value.filter(c => c.status === 'answered' && c?.user?.uid !== c?.reciver_uid)
    } else if (f === 'missed') {
        result = callsList.value.filter(c => c.status === 'missed')
    } else {
        result = callsList.value.filter(c => c.status === 'answered')
    }
    console.log(callsList.value)
    return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

const startCall = (type) => { if (type === 'audio' || type === 'video') $emit('start:call', type) }

onMounted(() => { callsStore.fetchList() })
</script>