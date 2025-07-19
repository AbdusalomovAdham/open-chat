<template>
    <div class="choose-contact">
        <div class="choose-contact-header">
            <div class="header-title">
                <ContactPlus />
                <h4>Contacts</h4>
            </div>
            <IconX @click="close()" style="cursor: pointer;" />
        </div>

        <div class="choose-contact-body pa-10">
            <div class="contact-body-content">
                <div class="contacts-group" v-for="(group, letter) in groupedContacts" :key="letter">
                    <h5 class="group-letter">{{ letter }}</h5>

                    <div v-for="contact in group" :key="contact?.id" class="contact-item pb-16"
                        @click="toggleContact(contact.id)">
                        <img v-if="contact?.avatar" :src="contact?.avatar" class="avatar w-40 h-40 mr-8" />
                        <div class="contact-info">
                            <span class="contact-name">{{ contact?.username }}</span>
                            <CheckBox :checkboxId="`contact-${contact.id}`"
                                :modelValue="selectedContacts.has(contact.id)"
                                @update:modelValue="val => updateContactCheck(contact.id, val)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="choose-contact-footer">
            <Button class="btn cancel-btn" @click="back()">Back</Button>
            <Button class="btn create-btn" @click="close()">Create Group</Button>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'
import IconX from '@/components/icon/X.vue'
import ContactPlus from '@/components/icon/ContactPlus.vue'
import CheckBox from '@/components/g/CheckBox.vue'
import Button from '@/components/g/Button.vue'

const selectedContacts = ref(new Set())

const $props = defineProps({
    chats: {
        type: Array,
        default: () => []
    },
    groupCardShow: {
        type: Boolean,
        default: false
    },
    cardGroup: {
        type: Boolean,
        default: true
    },
    cardContacts: {
        type: Boolean,
        default: false
    }
})

const $emit = defineEmits(['close:card', 'back:toCard'])

const groupedContacts = computed(() => {
    const groups = {}

    $props.chats
        .forEach(c => {
            const letter = c.username.charAt(0).toUpperCase()
                ; (groups[letter] ||= []).push(c)
        })

    return Object.fromEntries(Object.entries(groups).sort())
})

const close = () => {
    $emit('close:card')
}

const back = () => {
    $emit('back:toCard')
}

const toggleContact = (id) => {
    if (selectedContacts.value.has(id)) {
        selectedContacts.value.delete(id)
    } else {
        selectedContacts.value.add(id)
    }
}

const updateContactCheck = (id, value) => {
    if (value) selectedContacts.value.add(id)
    else selectedContacts.value.delete(id)
}
</script>
