<template>
    <div class="about-wrapper mx-24 pa-24 radius-8">
        <div class="about-item mb-16">
            <h3 class="item-title">About Me</h3>
            <div class="item-bio">
                <span class="bio-title">Bio:</span>
                <p>{{ userInfo.bio }}</p>
            </div>
        </div>

        <div class="user-infos" v-if="!showEditCard">
            <div class="user-info-content">
                <h5>Name:</h5>
                <span>{{ userInfo.name }}</span>
            </div>
            <div class="user-info-content">
                <h5>Email:</h5>
                <span>{{ userInfo.email }}</span>
            </div>
            <div class="user-info-content">
                <h5>Contact:</h5>
                <span>{{ userInfo.phone }}</span>
            </div>
            <div class="user-info-content">
                <h5>Address:</h5>
                <span>{{ userInfo.address }}</span>
            </div>
        </div>

        <div class="info-edit" @click="editProfile" v-if="!showEditCard">
            <IconNotePancil v-if="$props.theme === 'light'" />
            <IconNotePancilDark v-else />
            <span class="edit-title">Edit</span>
        </div>

        <EditAboutCard v-if="showEditCard" :userInfo="userInfo" @save="handleSave" @close="showEditCard = false" />
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, } from 'vue'
import IconNotePancil from '@/components/icon/NotePencil.vue'
import EditAboutCard from '@/components/g/EditAboutCard.vue'
import IconNotePancilDark from '@/components/icon/NotePancilDark.vue'
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    },
    theme: {
        type: String,
        default: 'light'
    }
})

const showEditCard = ref(false)

const editProfile = () => {
    showEditCard.value = true
}

const emit = defineEmits(['save'])

const handleSave = (updatedData) => {
    emit('save', updatedData)
    showEditCard.value = false
}
</script>