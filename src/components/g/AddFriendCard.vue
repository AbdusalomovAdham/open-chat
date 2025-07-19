<template>
    <transition name="slide-down-fade">
        <div class="add-friend-card" @click.self="emitClose" v-if="show">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-header-title">
                        <IconUserPlus />
                        <h4>Add Friend</h4>
                    </div>
                    <IconX class="close-card" @click.stop="emitClose" />
                </div>
                <div class="card-body">
                    <div class="error radius-8" v-if="showError">Enter username!</div>
                    <div class="error radius-8 find-error" v-if="findError">No such user was found!</div>
                    <form @submit.prevent>
                        <template v-for="(input, idx) in inputs" :key="idx">
                            <Input :label="input.label" :placeholder="input.placeholder" :important="input.important"
                                :type="input.type" v-model="input.modul" />
                        </template>
                    </form>
                </div>
                <div class="card-footer">
                    <Button class="btn cancel-btn" @click="emitClose">Cancel</Button>
                    <Button class="btn add-btn" @click="addFriend">Add Contact</Button>
                </div>
            </div>
        </div>
    </transition>
</template>



<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import IconUserPlus from '@/components/icon/UserPlus.vue'
import IconX from '@/components/icon/X.vue'
import Input from '@/components/g/Input.vue'
import Button from '@/components/g/Button.vue'

const props = defineProps({
    show: Boolean
})
const emit = defineEmits(['update:show'])

const emitClose = () => emit('update:show', false)

const showError = ref(false)
const findError = ref(false)

const username = ref('')
const phone = ref('')
const email = ref('')

const inputs = ref([
    { label: 'Username', placeholder: 'Username', important: true, type: 'text', modul: username },
    { label: 'Phone number', placeholder: 'Phone number', important: false, type: 'call', modul: phone },
    { label: 'Email', placeholder: 'Enter Email', important: false, type: 'email', modul: email }
])

const addFriend = () => {
    if (!username.value) {
        showError.value = true
        setTimeout(() => (showError.value = false), 3000)
    } else {
        showError.value = false
        emit('update:show', false)
    }
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