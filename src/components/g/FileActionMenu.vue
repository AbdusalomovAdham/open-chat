<template>
    <div class="action-wrapper">
        <div class="action-wrapper-content" v-for="(menu, idx) in   menus  " :key="idx">
            <div :class="menu?.type">{{ menu?.menu }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const menus = ref([
    { menu: 'Share', type: 'share' },
    { menu: 'Bookmark', type: 'bookmark' },
    { menu: 'Delete', type: 'delete' }
])

</script>