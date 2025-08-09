<template>
    <div class="input">
        <input :type="$props.type" :value="modelValue" :placeholder="$props.placeholder" class="w-100p radius-8"
            @input="input">
        <div v-if="$props.type === 'password' && $props.showForgot" class="forgot-password w-100p">
            <router-link to="reset/password">Forgot Password ?</router-link>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const $props = defineProps({
    placeholder: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: null,
    showForgot: {
        type: Boolean,
        default: true
    }
})

const $emits = defineEmits({
    input: null,
    'update:modelValue': null,
})


const input = (v) => $emits('update:modelValue', v.target.value) 
</script>