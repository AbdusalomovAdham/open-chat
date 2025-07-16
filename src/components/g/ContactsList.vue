<template>
    <div class="contacts-list px-24">
        <div class="contacts-group" v-for="(group, letter) in groupedContacts" :key="letter">
            <span class="group-letter px-10 py-15">{{ letter }}</span>

            <div v-for="contact in group" :key="contact?.id" class="contact-item pb-16"
                @click="selectedUserFunc(contact)">
                <img v-if="contact?.avatar" :src="contact?.avatar" class="avatar w-40 h-40 mr-8" />

                <div class="contact-info">
                    <template v-if="editIndex === contact?.id">
                        <input v-model="editName" @keydown.enter="saveEdit(contact)" @blur="cancelEdit"
                            class="edit-input px-20 py-10 radius-8" type="text" />
                    </template>
                    <span v-else class="contact-name">{{ contact?.username }}</span>

                    <component :is="theme === 'light' ? ThreeDots : ThreeDotsDark" class="three-dot"
                        @click="toggleMenu(contact)" />
                </div>
                <ContactMenu v-if="openMenu?.id === contact?.id" @edit="startEdit(contact)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import ThreeDots from '@/components/icon/ThreeDots.vue'
import ThreeDotsDark from '@/components/icon/ThreeDotsDark.vue'
import ContactMenu from '@/components/g/ContactMenu.vue'

const $props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    search: {
        type: String,
        default: null
    },
    contacts: {
        type: Array,
        default: () => []
    }
})

const $emit = defineEmits(['selected:user'])


const openMenu = ref(null)
const editIndex = ref(null)
const editName = ref('')

const toggleMenu = contact => {
    openMenu.value = openMenu.value?.username === contact.username ? null : contact
}

const startEdit = contact => {
    editIndex.value = contact?.id
    editName.value = contact.username
    openMenu.value = null
}

const saveEdit = contact => {
    contact.username = editName.value
    editIndex.value = null

}

const cancelEdit = () => (editIndex.value = null)

const onEscPress = e => e.key === 'Escape' && (openMenu.value = null)

onMounted(() => window.addEventListener('keydown', onEscPress))
onUnmounted(() => window.removeEventListener('keydown', onEscPress))

const groupedContacts = computed(() => {
    const q = $props.search?.trim().toLowerCase()

    const groups = {}

    $props.contacts
        .filter(c => !q || c.username.toLowerCase().includes(q))
        .forEach(c => {
            const letter = c.username.charAt(0).toUpperCase(); (groups[letter] ||= []).push(c)
        })

    return Object.fromEntries(Object.entries(groups).sort())
})
console.log('contacts', groupedContacts.value)

const selectedUserFunc = (contact) => {
    $emit('selected:user', contact)
}
</script>
