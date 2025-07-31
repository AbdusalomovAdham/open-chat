<template>
    <div class="edit-card">
        <form @submit.prevent="save">
            <div class="card-content">
                <label>Bio</label>
                <textarea v-model="localUser.bio" placeholder="Bio..." />
                <span v-if="error.bio">Must not exceed 100 characters!</span>
            </div>

            <div class="card-content" v-for="field in fields" :key="field.name">
                <label :for="field.name">{{ field.label }}</label>
                <input :type="field.type" :name="field.name" v-model="localUser[field.name]" v-if="field.name !== 'bio'"
                    @input="field.name === 'phone' && cleanPhone()" />
                <span v-if="error[field.name]">{{ field.error }}</span>
            </div>

            <div class="edit-btn">
                <button class="save radius-8" type="submit">Save</button>
                <button class="cancel radius-8" type="button" @click="$emit('close')">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watch, ref } from 'vue'
import { useSettingStore } from '@/store/user/settings';

const settingStore = useSettingStore()
const $props = defineProps({
    userInfo: {
        type: Object,
        default: () => ({})
    }
})
const $emit = defineEmits(['close', 'save'])
const localUser = reactive({ ...$props.userInfo })

watch(() => $props.userInfo, val => Object.assign(localUser, val))

const error = reactive({ email: false, bio: false, phone: false })

const fields = [
    { name: 'username', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', error: 'Enter Email!' },
    { name: 'phone_number', label: 'Phone', type: 'tel', error: 'Invalid phone number!' },
    { name: 'address', label: 'Location', type: 'text' }
]

const cleanPhone = () => {
    localUser.phone = localUser.phone.replace(/\D/g, '')
}

const save = async () => {
    $emit('save')
    $emit('close')
    console.log('local user', localUser)
    const { username, email, phone_number, address, bio } = localUser
    const body = { username, email, phone_number, address, bio }
    await settingStore.updateUser(body)
}
</script>