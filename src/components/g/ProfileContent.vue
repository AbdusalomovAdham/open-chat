<template>
    <div class="profile-content px-24">
        <div class="profile-content-info">
            <p class="info-bio">{{ $props?.profile?.bio }}</p>
            <ul class="info-items">
                <li class="info-item">
                    <h4>Phone </h4>
                    <span>{{ $props?.profile?.phone }}</span>
                </li>
                <li class="info-item">
                    <h4>City</h4>
                    <span>{{ $props?.profile?.address }}</span>
                </li>
                <li class="info-item">
                    <h4>Website</h4>
                    <span>{{ $props?.profile?.website }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import defineProps from 'vue'

const $props = defineProps({
    profile: {
        type: Object,
        default: null
    }

})
</script>