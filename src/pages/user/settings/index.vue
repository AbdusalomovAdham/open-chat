<template>
    <div class="page-settings ws-350">
        <ProfileHeader :name="userInfo?.name" :theme="theme" :img="UserImg" :title="title" />
        <div class="setting-card">
            <UserAboutCard :userInfo="userInfo" @save="updateUser" />
            <PrivacyCard />
            <NotificationCard />
            <HelpCard />
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import ProfileHeader from '@/components/g/ProfileHeader.vue';
import UserImg from '@/assets/images/user.png';
import UserAboutCard from '@/components/g/UserAboutCard.vue'
import PrivacyCard from '@/components/g/PrivacyCard.vue'
import NotificationCard from '@/components/g/NotificationCard.vue';
import HelpCard from '@/components/g/HelpCard.vue'

const title = ref('settings')
const theme = inject('theme')

const userInfo = ref({
    name: 'Username',
    email: 'chatizo_100@gmail.com',
    phone: '+998901234567',
    address: 'Germany / Berlin',
    bio: 'I’m a friendly kitchen assistant who suffers from a severe phobia of buttons'
})

const updateUser = (updatedData) => {
    userInfo.value = { ...updatedData }
}

</script>