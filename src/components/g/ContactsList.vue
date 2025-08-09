<template>
    <div class="contacts-list px-24">
        <div class="contacts-group" v-for="(group, letter) in groupedContacts" :key="letter">
            <span class="group-letter px-10 py-15">{{ letter }}</span>
            <div v-for="(contact, idx) in group" :key="idx" class="contact-item pb-16">
                <img :src="group[idx].contact?.avatar" class="avatar w-40 h-40 mr-8"
                    @click="selectedUserFunc(contact)" />
                <div class="contact-info">
                    <!-- <template v-if="editIndex === idx">
                        <input v-model="editName" @keydown.enter="saveEdit(contact)" @blur="cancelEdit"
                            class="edit-input px-20 py-10 radius-8" type="text" />
                    </template> -->
                    <span class="contact-name" @click="selectedUserFunc(contact)">{{ group[idx]?.contact?.username
                        }}</span>
                    <component :is="theme === 'light' ? ThreeDots : ThreeDotsDark" class="three-dot"
                        @click="toggleMenu(contact)" />
                </div>
                <ContactMenu v-if="openMenu === group[idx].contact.uid" @edit="startEdit(contact)"
                    @start:call="callStart" @contact:delete="deleteContact(contact)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, defineProps, defineEmits, watch } from 'vue'
import ThreeDots from '@/components/icon/ThreeDots.vue'
import ThreeDotsDark from '@/components/icon/ThreeDotsDark.vue'
import ContactMenu from '@/components/g/ContactMenu.vue'
import { useStoreContacts } from '@/store/user/contacts'

import router from '@/router'
const storeContacts = useStoreContacts()

const $props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    search: {
        type: String,
        default: null
    }
})

const $emit = defineEmits(['selected:user', 'call:start'])

const openMenu = ref('')
const editIndex = ref(null)
const editName = ref('')

const toggleMenu = (contact) => {
    openMenu.value = openMenu.value === contact.contact.uid ? '' : contact.contact.uid
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

const selectedUserFunc = async (contact) => {
    $emit('selected:user', contact)
    router.push(`/user/contacts/${contact?.contact?.uid}`)
}

const callStart = (callType) => { $emit('call:start', callType) }

const contacts = computed(() => storeContacts.contactList.value || [])

const contactsList = async () => {
    await storeContacts.fetchContacts()
}

const groupedContacts = computed(() => {
    const q = $props.search?.trim().toLowerCase()
    const groups = {}

    if (!contacts.value || contacts.value.length === 0) return []
    console.log('contacts.value', contacts.value)
    contacts.value
        .filter(c => c?.contact?.username && (!q || c.contact.username.toLowerCase().includes(q)))
        .forEach((c, index) => {
            const letter = c.contact.username.charAt(0).toUpperCase()
                ; (groups[letter] ||= []).push(c)
        })

    return Object.fromEntries(Object.entries(groups).sort())
})

onMounted(() => {
    window.addEventListener('keydown', onEscPress)
    contactsList()
})

onMounted(() => window.addEventListener('keydown', onEscPress))
onUnmounted(() => window.removeEventListener('keydown', onEscPress))

const deleteContact = async (contact) => {
    try {
        await storeContacts.deleteByUid(contact)
        await contactsList()
    } catch (e) {
        console.error(e)
    }
}
</script>
