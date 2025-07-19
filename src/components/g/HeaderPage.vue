<template>
    <div class="page-header px-24 py-24">
        <span>{{ $props.title }}</span>
        <div class="page-header-add radius-4 w-30 h-30" @click="showAddCard($props.icon)">
            <IconAdd class="header-add-icon" v-if="$props.theme === 'light' && !$props.icon" />
            <IconAddDark class="header-add-icon-dark" v-else-if="!$props.icon" />
            <IconGroup v-else-if="$props.theme === 'light' && $props.icon" />
            <IconGroupDark v-else-if="$props.theme === 'dark' && $props.icon" />
        </div>
    </div>
</template>

<script setup>
import IconAddDark from '@/components/icon/AddDark.vue'
import IconAdd from '@/components/icon/Add.vue';
import IconGroup from '@/components/icon/GroupUsers.vue'
import IconGroupDark from '@/components/icon/GroupUsersDark.vue'
import { defineProps, defineEmits } from 'vue'
const $propr = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    title: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
})

const $emit = defineEmits([
    'show:addCard',
    'show:groupCard'
])


const showAddCard = (icon) => {
    if (!icon) {
        $emit('show:addCard', true)
        console.log('showCard', true)
    }

    if (icon) {
        $emit('show:groupCard', true)
        console.log('show:groupCard', true)
    }

} 
</script>