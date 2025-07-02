<template>
    <div class="auth-sign-in ">
        <div class="auth-sign-in-main">
            <div class="sign-in-wrapper">
                <!-- LEFT: Banner Image -->
                <div class="sign-in-wrapper-banner">
                    <img :src="authMainImg" alt="Login Image" class="loginMainImg" />
                </div>

                <!-- RIGHT: Login Form -->
                <div class="sign-wrapper-form w-10p px-24 py-48">
                    <div class="sign-wrapper-form-title">
                        <img :src="loginDoor" alt="Login Door" class="loginDoor w-80 h-80" />
                        <h4 class="form-name mt-48 mb-16">Sign In</h4>
                    </div>

                    <!-- from section -->
                    <form @submit.prevent="handleLogin" class="w-100p">
                        <Input type="text" class="w-100p" placeholder="Enter email" v-model="form.email"></Input>
                        <Input type="password" class="w-100p mb-8" placeholder="Enter password"
                            v-model="form.password"></Input>
                        <transition name="fade">
                            <span v-if="showError" class="error">
                                Password or Email error!
                            </span>
                        </transition>
                        <Button type="submit" class="btn w-100p radius-8">Sign In</Button>
                    </form>
                    <span class="w-100p pt-16">
                        Need an acoount?
                        <router-link to="/auth/sign-up" class="sign-up-link">Sign Up</router-link>
                    </span>
                    <h5 class="pt-12 pb-12 w-100p">OR</h5>
                    <SocialButtons class="w-100p" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import loginDoor from '@/assets/images/login-door.png'
import authMainImg from '@/assets/images/login-main-img.png'
import Input from '@/components/g/SignInInput.vue'
import Button from '@/components/g/Button.vue'
import { ref } from 'vue';
import SocialButtons from '@/components/g/SocialButtons.vue'
import { useAuthSignIn } from '@/store/auth/sign-in'
import router from '@/router/routes';

const signInStore = useAuthSignIn()
const showError = ref(false)
const authError = ref(false)
const theme = ref('light')

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const form = ref({
    email: null,
    password: null
})

const handleLogin = async () => {
    const ok = await signInStore.SignIn({ ...form.value })

    if (!ok) {
        authError.value = true
        setTimeout(() => {
            authError.value = false
        }, 3000);
    }

    if (ok) console.log('not error')

    router.push('/user')
}

</script>
