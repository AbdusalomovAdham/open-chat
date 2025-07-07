<template>
    <div :class="['user-layout', theme]">
        <Sidebar :theme="theme" />
        <router-view :theme="theme"></router-view>
        <!-- <Chat /> -->
        <ModeButton :theme="theme" @toggle="toggleTheme" />
    </div>
</template>

<script setup>
import Sidebar from '@/components/layouts/default/Sidebar.vue';
import Chat from '@/components/layouts/default/Chat.vue'
import ModeButton from '@/components/g/ModeButton.vue';
import { ref, onMounted, provide } from 'vue';

const theme = ref('light')

onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) theme.value = saved
})

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    // console.log(theme.value)
}

provide('theme', theme)
</script>