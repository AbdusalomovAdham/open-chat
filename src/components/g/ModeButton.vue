<template>
    <button class="mode-btn" @click="changeMode">
        <!-- Tema nomiga qarab ikonka -->
        <IconMoon v-if="isLight" />
        <IconSun v-else />
    </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import IconSun from '@/components/icon/Sun'
import IconMoon from '@/components/icon/Moon'

const props = defineProps(
    { theme: String }
)

const emit = defineEmits(
    ['toggle']
)

const isLight = computed(() => props.theme === 'light')

const changeMode = () => {
    emit('toggle')
}
</script>