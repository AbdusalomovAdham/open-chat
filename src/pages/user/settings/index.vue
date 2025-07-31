<template>
    <div class="page-settings ws-350">
        <ProfileHeader :profileInfo="userInfo" :theme="theme" :img="UserImg" :title="title" />
        <div class="setting-card">
            <UserAboutCard :userInfo="userInfo" :theme="theme" />
            <PrivacyCard />
            <NotificationCard />
            <HelpCard />
        </div>
    </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import ProfileHeader from '@/components/g/ProfileHeader.vue';
import UserImg from '@/assets/images/user.png';
import UserAboutCard from '@/components/g/UserAboutCard.vue'
import PrivacyCard from '@/components/g/PrivacyCard.vue'
import NotificationCard from '@/components/g/NotificationCard.vue';
import HelpCard from '@/components/g/HelpCard.vue'
import { useSettingStore } from '@/store/user/settings';

const settingStore = useSettingStore()
const title = ref('Settings')
const theme = inject('theme')

const userInfo = computed(() => settingStore.user)
console.log('userinf', userInfo.value)
onMounted(() => {
    settingStore.userInfo()
})

</script>