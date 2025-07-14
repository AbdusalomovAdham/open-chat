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
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', error: 'Enter Email!' },
    { name: 'phone', label: 'Phone', type: 'tel', error: 'Invalid phone number!' },
    { name: 'address', label: 'Location', type: 'text' }
]

const cleanPhone = () => {
    localUser.phone = localUser.phone.replace(/\D/g, '')
}

const save = () => {
    let hasError = false

    if (!localUser.email) {
        error.email = true
        hasError = true
        setTimeout(() => (error.email = false), 3000)
    }

    if (localUser.bio?.length > 100) {
        error.bio = true
        hasError = true
        setTimeout(() => (error.bio = false), 3000)
    }

    if (localUser.phone?.length > 17) {
        error.phone = true
        hasError = true
        setTimeout(() => (error.phone = false), 3000)
    }

    if (hasError) return

    localUser.phone ||= 'No phone number'
    localUser.address ||= 'No address'

    $emit('save', { ...localUser })
    $emit('close')
}
</script>