<template>
  <div class="social-login">
    <button class="social-btn google">
      <GoogleIcon class="icon"/>
      Continue with Google
    </button>
    <button class="social-btn facebook">
      <FacebookIcon class="icon"/>
      Continue with Facebook
    </button>
    <button class="social-btn github">
      <GithubIcon class="icon"/>
      Continue with Github
    </button>
  </div>
</template>

<script setup>
import GoogleIcon from '@/components/icon/Google'
import FacebookIcon from '@/components/icon/Facebook'
import GithubIcon from '@/components/icon/GitHub'
</script>