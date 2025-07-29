<template>
    <div class="page-profile ws-350">
        <template v-if="profile">
            <ProfileHeader :profileInfo="profile" :theme="theme" :title="title" />
            <ProfileContent :profile="profile" />
            <ProfileMedia :media="profile?.media" />
        </template>
        <div v-else class="warn-msg">
            Nothing not found...
        </div>
    </div>
</template>

<script setup>
import ProfileHeader from '@/components/g/ProfileHeader.vue';
import ProfileContent from '@/components/g/ProfileContent.vue'
import ProfileMedia from '@/components/g/ProfileMedia.vue'

import { ref, inject, computed } from 'vue';
import { useChatStore } from '@/store/user/chat';

const chatStore = useChatStore()

const title = ref('Profile')
const theme = inject('theme')
const profile = computed(() => chatStore.userDetail)
</script>

<style scoped></style>