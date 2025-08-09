<template>
    <div class="auth-reset-psw">
        <div class="auth-reset-psw-main">
            <div class="reset-psw-wrapper">
                <!-- LEFT: Banner Image -->
                <div class="wrapper-banner">
                    <img :src="authMainImg" alt="Login Image" class="loginMainImg" />
                </div>

                <div class="wrapper-form w-100p px-24 py-48">
                    <div class="wrapper-form-title">
                        <img :src="resetPsw" alt="Reset password img" class="w-144 h-144" />
                        <h4 class="form-name mt-48 mb-16">Forgot password ?</h4>
                    </div>

                    <form @submit.prevent="resetPassword" class="w-100p">
                        <Input type="tel" class="w-100p mb-16 mt-16" placeholder="Enter phone numer"
                            v-model="form.phoneNumber"></Input>
                        <Input type="password" class="w-100p mb-16" placeholder="Enter new password"
                            v-model="form.newPassword" :showForgot="false"></Input>
                        <Input type="password" class="w-100p mb-16" placeholder="Confirm new password"
                            v-model="form.confirmPassword" :showForgot="false"></Input>
                        <Button type="submit" class="btn w-100p radius-8">Reset Password</Button>
                        <span class="w-100p pt-16">
                            Need an acoount?
                            <router-link to="/auth/sign-up" class="sign-up-link">Sign Up</router-link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import authMainImg from '@/assets/images/login-main-img.png'
import Input from '@/components/g/SignInInput.vue'
import resetPsw from '@/assets/images/reset-psw.png'
import Button from '@/components/g/Button.vue'
import { ref } from 'vue';

import { useStoreRestPassword } from '@/store/auth/reset-psw'
import router from '@/router';

const useStoreRestPsw = useStoreRestPassword()

const form = ref({
    phoneNumber: '',
    newPassword: '',
    confirmPassword: ''
})

const resetPassword = async () => {
    const { phoneNumber, newPassword, confirmPassword } = form.value

    if (!phoneNumber || !newPassword) return alert('Fill all line!')
    if (newPassword !== confirmPassword) return alert('Re-enter password!')
    if (newPassword && newPassword.length < 8) return alert("Password should be more than 8 characters long.")
    console.log(newPassword, phoneNumber)
    try {
        await useStoreRestPsw.resetPsw({ newPassword, phoneNumber })
        router.push('/auth/sign-in')
    } catch (e) {
        console.error(e)
        alert(e.message || 'Not found phone number!')
    }
}

</script>
