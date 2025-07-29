<template>
    <div class="sidebar-navigation">
        <a v-for="(nav, idx) in navs" :key="idx" @click="urlChange(nav.to)" class="sidebar-link sidebar-nav radius-8"
            :class="{ 'is-active': activeIdx === idx }">
            <component :is="activeIdx === idx ? nav.activeIcon : nav.icon" class="nav-icon" />
            <span class="nav-name">{{ nav.name }}</span>
        </a>
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
import IconLogoutActive from '@/components/icon/LogOutActive.vue'
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();
const navs = [
    { name: 'Chats', icon: IconChats, activeIcon: IconChatsActive, to: '/user/chats' },
    { name: 'Contacts', icon: IconContacts, activeIcon: IconContactsActive, to: '/user/contacts' },
    { name: 'Calls', icon: IconCalls, activeIcon: IconCallsActive, to: '/user/calls' },
    { name: 'Groups', icon: IconGroups, activeIcon: IconGroupsActive, to: '/user/groups' },
    { name: 'Profile', icon: IconProfile, activeIcon: IconProfileActive, to: '/user/profile' },
    { name: 'Settings', icon: IconSettings, activeIcon: IconSettingsActive, to: '/user/settings' },
    { name: 'Log Out', icon: IconLogout, activeIcon: IconLogoutActive, to: '/logout' },
];


const urlChange = async (to) => {
    const uid = route.params.uid
    if (!uid) return router.push(`${to}`)
    return router.push(`${to}/${uid}`)
};


const activeIdx = computed(() => {
    console.log('route.params.uid', route.params.uid)
    return navs.findIndex(nav => route.path.startsWith(nav.to))
})

</script>