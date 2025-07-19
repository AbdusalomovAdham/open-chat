<template>
    <div class="contact-menu py-8 radius-8">
        <ul class="menu-section">
            <li v-for="(item, index) in menuItems" :key="index" :class="item?.class" @click="editUser(item?.status)">
                {{ item?.text }}
                <component :is="item?.icon" @click="startCall(item?.status)" />
            </li>
        </ul>
    </div>
</template>


<script setup>
import { defineEmits } from 'vue'
import IconMute from '@/components/icon/BellSlash.vue'
import IconUser from '@/components/icon/User.vue'
import IconCall from '@/components/icon/Calls.vue'
import IconCamera from '@/components/icon/VideoCamera.vue'
import IconEdit from '@/components/icon/Edit.vue'
import IconBlock from '@/components/icon/Block.vue'
import IconTrash from '@/components/icon/Trash.vue'
import router from '@/router/routes'

const $emit = defineEmits(['edit', 'start:call'])
const menuItems = [
    { text: 'Mute Notification', icon: IconMute, class: 'mute', status: 'mute' },
    { text: 'View Profile', icon: IconUser, class: 'view-profile pb-10', status: 'profile' },
    { text: 'Audio call', icon: IconCall, class: 'call-audio', status: 'audio' },
    { text: 'Video call', icon: IconCamera, class: 'call-video pb-10', status: 'video' },
    { text: 'Edit', icon: IconEdit, class: 'edit-user', status: 'edit' },
    { text: 'Block', icon: IconBlock, class: 'block-user', status: 'block' },
    { text: 'Remove', icon: IconTrash, class: 'trash-user', status: 'remove' }
]

const editUser = (status) => {
    if (status === 'edit') $emit('edit')
    if (status === 'profile') {
        router.push('/user/profile')
    }
}

const startCall = (callType) => {
    if (callType === 'audio' || callType === 'video') $emit('start:call', callType)
    console.log(callType)

}
</script>
