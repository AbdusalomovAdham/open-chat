<template>
    <div class="auth-sign-up ">
        <div class="auth-sign-up-main">
            <div class="sign-up-wrapper">
                <!-- LEFT: Banner Image -->
                <div class="sign-up-wrapper-banner">
                    <img :src="authMainImg" alt="Login Image" class="loginMainImg" />
                </div>

                <!-- RIGHT: Login Form -->
                <div class="sign-wrapper-form w-10p px-24 py-15">
                    <div class="sign-wrapper-form-title">
                        <img :src="loginDoor" alt="Login Door" class="loginDoor w-80 h-80" />
                        <h4 class="form-name mt-40 mb-16">Sign Up</h4>
                    </div>

                    <!-- from section -->
                    <form @submit.prevent="handleLogin" class="w-100p">
                        <div class="client-names">
                            <Input type="text" placeholder="Username" v-model="form.username"></Input>
                        </div>
                        <Input type="text" class="w-100p " placeholder="Enter email" v-model="form.email"></Input>
                        <Input type="password" class="w-100p mb-8" placeholder="Enter password"
                            v-model="form.password"></Input>
                        <transition name="fade">
                            <span v-if="showError" class="error">
                                {{ errorMsg }}
                            </span>
                        </transition>
                        <Button type="submit" class="btn w-100p radius-8">Sign Un</Button>
                    </form>
                    <span class="w-100p pt-16">
                        Already have an account?
                        <router-link to="/auth/sign-in" class="sign-in-link">Log In</router-link>
                    </span>
                    <h5 class="pt-12 pb-12 w-100p">OR</h5>
                    <SocialButtons class="w-100p" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import loginDoor from '@/assets/images/login-door.png'
import authMainImg from '@/assets/images/login-main-img.png'
import Input from '@/components/g/SignInInput.vue'
import Button from '@/components/g/Button.vue'
import SocialButtons from '@/components/g/SocialButtons.vue'
import { useAuthSignUp } from '@/store/auth/sign-up'
import router from '@/router/routes'

const signUpStore = useAuthSignUp()

const showError = ref(false)
const errorMsg = ref('')

const form = ref({
    email: null,
    password: null,
    username: null,
})

const handleLogin = async () => {
    const { username, password } = form.value

    const showErrorMessage = (msg) => {
        errorMsg.value = msg
        showError.value = true
        setTimeout(() => {
            showError.value = false
            errorMsg.value = ''
        }, 3000)
    }

    if (!username || !password) return showErrorMessage('Fill all lines!')
    if (password.length < 8) return showErrorMessage('Password should be more than 8 characters long.')

    try {
        await signUpStore.SignUp({ ...form.value })
        alert(`Welcome! ${username}`)
        router.push('/user/chats')
    } catch (err) {
        console.error(err)
        showErrorMessage(err.message || 'Already username!')
    }
}
</script>
