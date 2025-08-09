<template>
    <div class="sidebar px-24 py-16">
        <div class="sidebar-logo mb-8">
            <router-link to="/user/chats">
                <img :src="Logo" alt="" class="w-70 h-50">
                <span class="sidebar-logo-name">OPENCHAT</span>
            </router-link>
        </div>
        <div class="sidebar-main-nav">
            <SidebarNav />
            <div class="sidebar-nav-profile">
                <div class="nav-profile-main">
                    <div class="nav-profile-user-img w-48 h-48">
                        <img :src="profile?.avatar" alt="user's image" class="w-40 h-40">
                    </div>
                    <span class="nav-profile-username">{{ profile?.username || '-' }}</span>
                </div>
                <IconThreeDots class="nav-profile-icon-dots" v-if="$props.theme === 'light'" />
                <IconThreeDotsDark class="nav-profile-icon-dots" v-else />
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from '@/assets/images/logo.png'
import SidebarNav from '@/components/g/SidebarNav.vue';
import ImgUser from '@/assets/images/user.png'
import IconThreeDots from '@/components/icon/ThreeDots.vue'
import IconThreeDotsDark from '@/components/icon/ThreeDotsDark.vue'
import { ref, defineProps, onMounted, computed } from 'vue'
import { useSettingStore } from '@/store/user/settings/index'

const settingStore = useSettingStore()
const profile = computed(() => settingStore.user)
const $props = defineProps({
    theme: {
        type: String,
        default: 'light'
    }
})

onMounted(() => {
    settingStore.userInfo()
})
</script>