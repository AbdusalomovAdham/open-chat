<template>
    <div class="auth-reset-psw">
        <div class="auth-reset-psw-main">
            <div class="reset-psw-wrapper">
                <!-- LEFT: Banner Image -->
                <div class="wrapper-banner">
                    <img :src="authMainImg" alt="Login Image" class="loginMainImg" />
                </div>

                <!-- RIGHT: Reset psw Form -->
                <div class="wrapper-form w-100p px-24 py-48">
                    <div class="wrapper-form-title">
                        <img :src="resetPsw" alt="Reset password img" class="w-144 h-144" />
                        <h4 class="form-name mt-48 mb-16">Forgot password ?</h4>
                    </div>

                    <!-- form section -->
                    <form @submit.prevent="handleLogin" class="w-100p">
                        <Input type="text" class="w-100p mb-16 mt-16" placeholder="Enter email"
                            v-model="form.email"></Input>
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

const form = ref({
    email: null,
    newPassword: null,
    confirmPassword: null
})

const pswReset = () => {
    console.log('well come')
}

const handleLogin = async () => {
    pswReset()
}
</script>
