<template>
    <div class="notification-wrapper mx-24 mt-24 pa-24 radius-8">
        <div class="wrapper-title mb-24">Notification</div>
        <div class="wrapper-content pb-16 mb-16" v-for="(notification, idx) in notifications" :key="idx">
            <h4>{{ notification.title }}</h4>
            <ToggleTwichVue />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ToggleTwichVue from '@/components/g/ToggleSwitch.vue';

const notifications = ref([
    { title: "Video Call Notification :", type: 'toggle' },
    { title: "Message Notification :", type: 'toggle' },
    { title: "Audio Call Notification :", type: 'toggle' }
])
</script>