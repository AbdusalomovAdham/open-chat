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
                        <Input type="text" class="w-100p" placeholder="Enter username" v-model="form.username"></Input>
                        <Input type="password" class="w-100p mb-8" placeholder="Enter password"
                            v-model="form.password"></Input>
                        <transition name="fade">
                            <span v-if="showError" class="error">
                                {{ errMsg }}
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
import { ref, reject, resolve } from 'vue';
import SocialButtons from '@/components/g/SocialButtons.vue'
import { useAuthSignIn } from '@/store/auth/sign-in'
import router from '@/router/index';

const signInStore = useAuthSignIn()
const showError = ref(false)
const authError = ref(false)
const errMsg = ref('')

const form = ref({
    username: null,
    password: null
})

const handleLogin = async () => {
    const { username, password } = form.value
    const errMsgFunc = (msg) => {
        errMsg.value = msg
        showError.value = true
        setTimeout(() => {
            showError.value = false
            errMsg.value = ''
        }, 3000);
    }

    if (!username || !password) return errMsgFunc('Fill all line!')

    try {
        await signInStore.SignIn({ username, password })
        alert('Welcome!', username)
        router.push('/user/chats')
    } catch (e) {
        errMsgFunc(e.message || 'Error password or username')
    }

}

</script>