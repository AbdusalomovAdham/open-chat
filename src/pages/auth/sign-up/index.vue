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
                            <Input type="text" placeholder="First name" v-model="form.firstName"></Input>
                            <Input type="text" placeholder="Last name" v-model="form.lastName"></Input>
                        </div>
                        <Input type="text" class="w-100p " placeholder="Enter email" v-model="form.email"></Input>
                        <Input type="password" class="w-100p mb-8" placeholder="Enter password"
                            v-model="form.password"></Input>
                        <transition name="fade">
                            <span v-if="showError" class="error">
                                {{ errorMsg }}
                            </span>
                        </transition>
                        <Button type="submit" class="btn w-100p radius-8">Sign In</Button>
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
import { ref } from 'vue';
import loginDoor from '@/assets/images/login-door.png'
import authMainImg from '@/assets/images/login-main-img.png'
import Input from '@/components/g/SignInInput.vue'
import Button from '@/components/g/Button.vue'
import SocialButtons from '@/components/g/SocialButtons.vue'
import { useAuthSignUp } from '@/store/auth/sign-up'

const signUpStore = useAuthSignUp()
const showError = ref(false)
const authError = ref(false)
const errorMsg = ref('')
const form = ref({
    email: null,
    password: null,
    firstName: null,
    lastName: null
})

const handleLogin = async () => {
    console.log({ ...form.value })
    const ok = await signUpStore.SignUp({ ...form.value })
    const allFilled = Object.values(form.value).every(val => !!val);
    console.log('ok', ok)
    if (!ok) {
        showError.value = true
        errorMsg.value = 'Fill in all the lines!'
        setTimeout(() => {
            showError.value = false
            errorMsg.value = ''
        }, 3000);
    }

    if (!ok && allFilled) {
        showError.value = true;
        errorMsg.value = 'Email already registrated!'
        setTimeout(() => {
            showError.value = false;
            errorMsg.value = ''
        }, 3000);
    }


}

</script>
