<template>
    <div class="contacts-list px-24">
        <div class="contacts-group" v-for="(group, letter) in groupedContacts" :key="letter">
            <span class="group-letter px-10 py-15">{{ letter }}</span>

            <div v-for="contact in group" :key="contact?.id" class="contact-item pb-16">
                <img v-if="contact?.avatar" :src="contact?.avatar" class="avatar w-40 h-40 mr-8" />

                <div class="contact-info">
                    <template v-if="editIndex === contact?.id">
                        <input v-model="editName" @keydown.enter="saveEdit(contact)" @blur="cancelEdit"
                            class="edit-input px-20 py-10 radius-8" type="text" />
                    </template>
                    <span v-else class="contact-name">{{ contact?.name }}</span>

                    <component :is="theme === 'light' ? ThreeDots : ThreeDotsDark" class="three-dot"
                        @click="toggleMenu(contact)" />
                </div>
                <ContactMenu v-if="openMenu?.name === contact?.name" @edit="startEdit(contact)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, defineProps } from 'vue'
import ThreeDots from '@/components/icon/ThreeDots.vue'
import ThreeDotsDark from '@/components/icon/ThreeDotsDark.vue'
import ContactMenu from '@/components/g/ContactMenu.vue'
import UserImg from '@/assets/images/user.png'

const props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    search: {
        type: String,
        default: null
    }
})

const contacts = [
    { id: 1, name: 'Amelia Jury', avatar: UserImg },
    { id: 2, name: 'Anthony Ledonne', avatar: UserImg },
    { id: 3, name: 'Brian Richards', avatar: UserImg },
    { id: 4, name: 'Charles Pinard', avatar: UserImg },
    { id: 5, name: 'Fenrick Beriwck', avatar: UserImg },
    { id: 6, name: 'Fidel Pinard', avatar: UserImg },
]

const openMenu = ref(null)
const editIndex = ref(null)
const editName = ref('')

const toggleMenu = contact => {
    openMenu.value = openMenu.value?.name === contact.name ? null : contact
}

const startEdit = contact => {
    editIndex.value = contact.id
    editName.value = contact.name
    openMenu.value = null
    console.log('start')
}

const saveEdit = contact => {
    contact.name = editName.value
    editIndex.value = null

}

const cancelEdit = () => (editIndex.value = null)

const onEscPress = e => e.key === 'Escape' && (openMenu.value = null)

onMounted(() => window.addEventListener('keydown', onEscPress))
onUnmounted(() => window.removeEventListener('keydown', onEscPress))

const groupedContacts = computed(() => {
    const q = props.search?.trim().toLowerCase()

    const groups = {}

    contacts
        .filter(c => !q || c.name.toLowerCase().includes(q))
        .forEach(c => {
            const letter = c.name.charAt(0).toUpperCase(); (groups[letter] ||= []).push(c)
        })

    return Object.fromEntries(Object.entries(groups).sort())
})

</script>
