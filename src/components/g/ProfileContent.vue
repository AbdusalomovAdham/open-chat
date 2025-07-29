<template>
    <div class="profile-content px-24">
        <div class="profile-content-info">
            <p class="info-bio">Bio: {{ $props?.profile?.bio || "-" }} </p>
            <ul class="info-items">
                <li class="info-item">
                    <h4>Phone: </h4>
                    <span>{{ $props?.profile?.phone_number || "-" }}</span>
                </li>
                <li class="info-item">
                    <h4>City: </h4>
                    <span>{{ $props?.profile?.address || '-' }}</span>
                </li>
                <li class="info-item">
                    <h4>Bio: </h4>
                    <span>{{ $props?.profile?.bio || '-' }}</span>
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
        default: () => { }
    }

})
</script>