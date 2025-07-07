<template>
  <div :class="['layouts-auth', theme]">
    <div class="layouts-auth-wrapper">
      <router-view></router-view>
      <ModeButton :theme="theme" @toggle="toggleTheme" />
    </div>
  </div>
</template>

<script setup>
import ModeButton from '@/components/g/ModeButton.vue';
import { ref, onMounted } from 'vue';
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
</script>