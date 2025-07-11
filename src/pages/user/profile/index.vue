<template>
    <div class="page-profile ws-350">
        <ProfileHeader :name="profile?.name" :theme="theme" :img="profile?.img" :title="title" />
        <ProfileContent :profile="profile" />
        <ProfileMedia :media="profile?.media" />
    </div>
</template>

<script setup>
import ProfileHeader from '@/components/g/ProfileHeader.vue';
import UserImg from '@/assets/images/user.png';
import NatureImg from '@/assets/images/nature.jpg'
import ProfileContent from '@/components/g/ProfileContent.vue'
import ProfileMedia from '@/components/g/ProfileMedia.vue'
import Media from '@/components/g/Media.vue'
import Video from '@/assets/images/video.mp4'
import { ref, inject } from 'vue';

const title = ref('Profile')
const theme = inject('theme')
const profile = ref({
    id: 1,
    name: 'Harrish Welsh',
    time: 'Today',
    img: UserImg,
    bio: "If several languages coalesce, the grammar of the resulting language is more simple.",
    phone: '+99901234567',
    address: 'Country/city',
    website: 'www.example.com',
    media: {
        images: [
            NatureImg,
            NatureImg,
            NatureImg,
            NatureImg,
            NatureImg,

        ],
        videos: [
            Video,
            Video,
            Video,
            Video,
            Video,
            Video
        ],
        files: [
            {
                name: "myfile.pdf",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/file.pdf",
                time: "Today 14:22"
            },
            {
                name: "myfile.pdf",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/file.pdf",
                time: "Today 14:22"
            },
            {
                name: "myfile.pdf",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/file.pdf",
                time: "Today 14:22"
            },
            {
                name: "myfile.mp4",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/file.pdf",
                time: "Today 14:22"
            },
            {
                name: "video.mp4",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/File/video.mp4",
                time: "Today 14:22"
            },
            {
                name: "myfile.zip",
                size: "12.5 MB",
                type: "application/pdf",
                url: "/file.pdf",
                time: "Today 14:22"
            }

        ],
        links: [
            {
                title: "Landing Template",
                url: "https://themeforest.net/search/srbthemes",
                image: "https://example.com/image.jpg"
            },
            {
                title: "Landing Template",
                url: "https://themeforest.net/search/srbthemes",
                image: "https://example.com/image.jpg"
            },
            {
                title: "Landing Template",
                url: "https://themeforest.net/search/srbthemes",
                image: "https://example.com/image.jpg"
            }
        ]
    }
})
</script>