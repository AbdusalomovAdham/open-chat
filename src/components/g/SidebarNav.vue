<template>
    <div class="sidebar-navigation">
        <div class="sidebar-nav" v-for="(nav, idx) in navs" :key="idx" @click="activeNav(idx)"
            :class="{ 'is-active': activeIdx === idx }">
            <router-link :to="nav.to" class="sidebar-link">
                <component :is="nav.icon" class="nav-icon" v-if="activeIdx !== idx" />
                <component :is="nav.activeIcon" v-else />
                <span class="nav-name">{{ nav.name }}</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import IconChats from '@/components/icon/Chats.vue'
import IconContacts from '@/components/icon/Contacts.vue'
import IconCalls from '@/components/icon/Calls.vue'
import IconGroups from '@/components/icon/Groups.vue'
import IconProfile from '@/components/icon/Profile.vue'
import IconSettings from '@/components/icon/Settings.vue'
import IconLogout from '@/components/icon/Logout.vue'

import IconChatsActive from '@/components/icon/ActiveChats.vue'
import IconContactsActive from '@/components/icon/ActiveContacts.vue'
import IconCallsActive from '@/components/icon/ActiveCalls.vue'
import IconGroupsActive from '@/components/icon/ActiveGroups.vue'
import IconProfileActive from '@/components/icon/ActiveProfile.vue'
import IconSettingsActive from '@/components/icon/ActiveSettings.vue'
import { ref } from 'vue'

const navs = [
    { name: 'Chats', icon: IconChats, activeIcon: IconChatsActive, to: '/user' },
    { name: 'Contacts', icon: IconContacts, activeIcon: IconContactsActive, to: '/user' },
    { name: 'Calls', icon: IconCalls, activeIcon: IconCallsActive, to: '/user' },
    { name: 'Groups', icon: IconGroups, activeIcon: IconGroupsActive, to: '/user' },
    { name: 'Profile', icon: IconProfile, activeIcon: IconProfileActive, to: '/user' },
    { name: 'Settings', icon: IconSettings, activeIcon: IconSettingsActive, to: '/user' },
    { name: 'Log Out', icon: IconLogout, to: '/user' },
];

const activeIdx = ref(0)

const activeNav = (idx) => {
    activeIdx.value = idx
}
</script>