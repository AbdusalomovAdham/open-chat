<template>
    <div class="page-settings">
        <ProfileHeader :name="profile?.name" :theme="theme" :img="profile?.img" :title="title" />

    </div>
</template>

<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>