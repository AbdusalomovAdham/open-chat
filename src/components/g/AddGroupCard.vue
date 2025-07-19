<template>
    <transition name="slide-down-fade">
        <div class="add-group-card" v-if="show" @click.self="emitClose">
            <!-- Group Card (form) -->
            <transition name="slide-down-fade">
                <div class="card-content" v-if="cardGroup">
                    <div class="card-header">
                        <div class="card-header-title">
                            <IconUsersThree />
                            <h4>Add Group</h4>
                        </div>
                        <IconX class="close-card" @click="emitClose" />
                    </div>

                    <div class="card-body">
                        <form @submit.prevent>
                            <template v-for="(input, idx) in inputs" :key="idx">
                                <Input :label="input.label" :placeholder="input.placeholder"
                                    :important="input.important" :type="input.type" v-model="input.modul"
                                    :accept="input?.accept" :class="{ 'file-input': input.type === 'file' }" />
                            </template>
                        </form>
                    </div>

                    <div class="card-footer">
                        <Button class="btn cancel-btn" @click="emitClose">Cancel</Button>
                        <Button class="btn add-btn" @click="openContacts">Add Participant</Button>
                    </div>
                </div>
            </transition>

            <!-- Contacts Card -->
            <transition name="slide-down-fade">
                <div v-if="cardContacts">
                    <ChooseContactVue :chats="chats" :groupCardShow="show" @close:card="emitClose"
                        @back:toCard="backFunc" />
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import IconUsersThree from '@/components/icon/UsersThree.vue'
import IconX from '@/components/icon/X.vue'
import Input from '@/components/g/Input.vue'
import Button from '@/components/g/Button.vue'
import ChooseContactVue from './ChooseContact.vue'

const props = defineProps({
    chats: {
        type: Array,
        default: () => []
    },
    show: Boolean
})

const emit = defineEmits(['update:show'])

const groupName = ref('')
const file = ref(null)
const cardGroup = ref(true)
const cardContacts = ref(false)

const inputs = ref([
    { label: 'Group name', placeholder: 'Group name', important: false, type: 'text', modul: groupName },
    { label: 'Choose Profile', placeholder: '', important: false, type: 'file', modul: file, accept: ".jpg,.jpeg,.png" },
])

const emitClose = () => {
    emit('update:show', false)
    cardGroup.value = true
    cardContacts.value = false
}

const openContacts = () => {
    cardGroup.value = false
    setTimeout(() => {
        cardContacts.value = true
    }, 300)
}

const backFunc = () => {
    cardContacts.value = false
    setTimeout(() => {
        cardGroup.value = true
    }, 300)
}
</script>

<style scoped>
.slide-down-fade-enter-active,
.slide-down-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-down-fade-enter-from,
.slide-down-fade-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

.slide-down-fade-enter-to,
.slide-down-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
}
</style>
