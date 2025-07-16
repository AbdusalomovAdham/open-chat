<template>
    <div :class="['user-layout', theme]">
        <Sidebar :theme="theme" />
        <router-view @selected:user="handleUserInfo"></router-view>
        <ChatWindow :theme="theme" class="chat-main" />
        <ModeButton :theme="theme" @toggle="toggleTheme" />
    </div>
</template>

<script setup>
import Sidebar from '@/components/layouts/user/Sidebar.vue';
import ChatWindow from '@/components/layouts/user/ChatWindow.vue'
import ModeButton from '@/components/g/ModeButton.vue';
import User from '@/assets/images/user.png'
import Audio from '@/assets/images/audio.mp3'
import { ref, onMounted, provide } from 'vue';
import Image from '@/assets/images/nature.jpg'
import Video from '@/assets/images/video.mp4'

const theme = ref('light')
const selectedUser = ref(null)

const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
}

onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) theme.value = saved
})

const chats = ref([
    {
        id: 1,
        username: 'Amelia Jury',
        avatar: User,
        msgNumber: '3',
        favorite: false,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Salom Amelia!', fromMe: true, time: '10:01' },
            { type: 'video', content: Video, fromMe: false, time: '10:03' },
            { type: 'voice', content: Audio, fromMe: true, time: '10:05' },
            { type: 'text', content: 'Yaxshimisan? Bugun dars bor edi.', fromMe: true, time: '10:06' },
            { type: 'text', content: 'Ha, keldim. Juda yaxshi o‘tdi!', fromMe: false, time: '10:07' },
            { type: 'image', content: Image, fromMe: false, time: '10:08' },
            { type: 'text', content: 'Bu suratni hozir oldim.', fromMe: false, time: '10:08' },
            { type: 'voice', content: Audio, fromMe: false, time: '10:10' },
            { type: 'text', content: 'Zo‘r chiqibdi! Qolganlarga ham yuboramizmi?', fromMe: true, time: '10:12' },
            { type: 'text', content: 'Bo‘ldi, gruppaga tashlayman.', fromMe: false, time: '10:13' },
            { type: 'image', content: Image, fromMe: true, time: '10:15' },
            { type: 'text', content: 'Mana, bu ham kerak edi.', fromMe: true, time: '10:16' },
            { type: 'voice', content: Audio, fromMe: false, time: '10:17' },
            { type: 'text', content: 'Rahmat, juda foydali bo‘ldi.', fromMe: true, time: '10:19' },
            { type: 'text', content: 'Ertaga soat nechchida uchrashamiz?', fromMe: true, time: '10:20' },
            { type: 'text', content: 'Soat 9:00 da kutaman.', fromMe: false, time: '10:21' },
            { type: 'voice', content: Audio, fromMe: false, time: '10:22' }
        ]

    },
    {
        id: 2,
        username: 'Anthony Ledonne',
        avatar: User,
        msgNumber: '7',
        favorite: true,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Yaxshi kunlar!', fromMe: false, time: '09:20' },
            { type: 'text', content: 'Bugun uchrashamizmi?', fromMe: false, time: '09:22' },
            { type: 'image', content: Image, fromMe: true, time: '09:24' },
            { type: 'voice', content: Audio, fromMe: false, time: '09:30' }
        ]
    },
    {
        id: 3,
        username: 'Brian Richards',
        avatar: User,
        msgNumber: '0',
        favorite: true,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Brian, tayyormisan?', fromMe: true, time: '08:15' },
            { type: 'voice', content: Audio, fromMe: false, time: '08:17' }
        ]
    },
    {
        id: 4,
        username: 'Charles Pinard',
        avatar: User,
        msgNumber: '12',
        favorite: false,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Bugun konferensiya bor.', fromMe: false, time: '11:45' },
            { type: 'image', content: Image, fromMe: false, time: '11:46' },
            { type: 'text', content: 'OK, qatnashaman.', fromMe: true, time: '11:50' }
        ]
    },
    {
        id: 5,
        username: 'Fenrick Beriwck',
        avatar: User,
        msgNumber: '9',
        favorite: false,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'voice', content: Audio, fromMe: true, time: '14:02' },
            { type: 'text', content: 'Mana shu faylni eshit.', fromMe: true, time: '14:03' },
            { type: 'text', content: 'Eshitdim, yaxshi chiqqan!', fromMe: false, time: '14:04' }
        ]
    },
    {
        id: 6,
        username: 'Fidel Pinard',
        avatar: User,
        msgNumber: '5',
        favorite: true,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'image', content: Image, fromMe: false, time: '15:01' },
            { type: 'text', content: 'Zo‘r surat!', fromMe: true, time: '15:02' },
            { type: 'voice', content: Audio, fromMe: false, time: '15:05' }
        ]
    },
    {
        id: 7,
        username: 'Elena Brown',
        avatar: User,
        msgNumber: '2',
        favorite: false,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Salom Elena!', fromMe: true, time: '13:15' },
            { type: 'text', content: 'Yordam kerakmi?', fromMe: true, time: '13:17' },
            { type: 'voice', content: Audio, fromMe: false, time: '13:20' }
        ]
    },
    {
        id: 8,
        username: 'Sophia Clark',
        avatar: User,
        msgNumber: '10',
        favorite: true,
        chat_start_time: '15 December 2024',
        messages: [
            { type: 'text', content: 'Rasm yuboring.', fromMe: false, time: '16:00' },
            { type: 'image', content: Image, fromMe: true, time: '16:02' },
            { type: 'voice', content: Audio, fromMe: true, time: '16:05' }
        ]
    },
    { id: 9, username: 'Amelia Jury', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
    { id: 10, username: 'Anthony Ledonne', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
    { id: 11, username: 'Brian Richards', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
    { id: 12, username: 'Charles Pinard', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
    { id: 13, username: 'Fenrick Beriwck', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
    { id: 14, username: 'Fidel Pinard', avatar: User, msgNumber: 0, messages: [], favorite: false, chat_start_time: '' },
])

const groups = ref([
    {
        id: 1,
        name: 'Designer',
        count: null,
        lastMessage: 'Yangi dizayn konsepti tayyor!',
        messages: [
            { type: 'text', content: 'Yangi dizayn konsepti tayyor!', fromMe: true, time: '09:20' },
            { type: 'image', content: Image, fromMe: false, time: '09:22', username: 'User', avatar: User },
            { type: 'voice', content: Audio, fromMe: false, time: '09:25', username: 'DesignBot', avatar: User }
        ]
    },
    {
        id: 2,
        name: 'Landing Design',
        count: '09',
        lastMessage: 'Header joylashuvi haqida fikrlar?',
        messages: [
            { type: 'text', content: 'Header joylashuvi haqida fikrlar?', fromMe: false, time: '10:01', id: 1, username: 'User', avatar: User },
            { type: 'image', content: 'images/landing-header.png', fromMe: true, time: '10:02' },
            { type: 'text', content: 'Bu versiya yaxshi.', fromMe: true, time: '10:03' }
        ]
    },
    {
        id: 3,
        name: 'Snacks',
        count: null,
        lastMessage: 'Bugun kim nima olib keladi? 🍕',
        messages: [
            { type: 'text', content: 'Bugun kim nima olib keladi? 🍕', fromMe: false, time: '11:00', username: 'User', avatar: User },
            { type: 'text', content: 'Men chip olib kelaman.', fromMe: true, time: '11:02' }
        ]
    },
    {
        id: 4,
        name: 'Reporting',
        count: '10',
        lastMessage: 'Hisobotni ertaga topshiramiz.',
        messages: [
            { type: 'text', content: 'Hisobotni ertaga topshiramiz.', fromMe: false, time: '08:45', username: 'User', avatar: User },
            { type: 'voice', content: Audio, fromMe: false, time: '08:46', username: 'Reporter', avatar: User }
        ]
    },
    {
        id: 5,
        name: 'Frontend Team',
        count: '03',
        lastMessage: 'Button hover animatsiyasi zo‘r chiqqan!',
        messages: [
            { type: 'text', content: 'Button hover animatsiyasi zo‘r chiqqan!', fromMe: true, time: '09:10' },
            { type: 'image', content: 'images/hover-demo.gif', fromMe: false, time: '09:11', username: 'FrontendDev', avatar: User }
        ]
    },
    {
        id: 6,
        name: 'Backend Team',
        count: null,
        lastMessage: 'API testdan o‘tdi, merge qildim.',
        messages: [
            { type: 'text', content: 'API testdan o‘tdi, merge qildim.', fromMe: true, time: '13:00' },
            { type: 'voice', content: Audio, fromMe: false, time: '13:03', username: 'BackendDev', avatar: User }
        ]
    },
    {
        id: 7,
        name: 'Marketing',
        count: '12',
        lastMessage: 'Yangi kampaniya posterini tekshirib chiqing.',
        users: [
            { id: 1, },
            { id: 8 }
        ],
        messages: [
            { type: 'image', content: Image, fromMe: false, time: '12:30', username: 'User', avatar: User },
            { type: 'text', content: 'Yangi kampaniya posterini tekshirib chiqing.', fromMe: false, time: '12:31', username: 'MarketingLead', avatar: User }
        ]
    },
    {
        id: 8,
        name: 'Finance',
        count: null,
        lastMessage: 'Oy yakuni balans tayyor.',
        users: [
            { id: 1, username: 'User', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'Oy yakuni balans tayyor.', fromMe: true, time: '10:30' }
        ]
    },
    {
        id: 9,
        name: 'HR',
        count: '06',
        lastMessage: 'Yangi xodimlar ro‘yxatini yubordim.',
        users: [
            { id: 1, username: 'User', avatar: User },
            { id: 9, username: 'HRManager', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'Yangi xodimlar ro‘yxatini yubordim.', fromMe: false, time: '16:45' },
            { type: 'image', content: 'images/hr-list.png', fromMe: false, time: '16:46' }
        ]
    },
    {
        id: 10,
        name: 'Product Owners',
        count: null,
        lastMessage: 'Sprint uchun featurelar tasdiqlandi.',
        messages: [
            { type: 'text', content: 'Sprint uchun featurelar tasdiqlandi.', fromMe: true, time: '15:00', username: 'User', avatar: User }
        ]
    },
    {
        id: 11,
        name: 'Support',
        count: '02',
        lastMessage: 'Ticket #254 hal qilindi.',
        messages: [
            { type: 'text', content: 'Ticket #254 hal qilindi.', fromMe: false, time: '17:10', username: 'User', avatar: User }
        ]
    },
    {
        id: 12,
        name: 'QA Team',
        count: '05',
        lastMessage: 'Bugungi regress test yakunlandi.',
        users: [
            { id: 1, username: 'User', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'Bugungi regress test yakunlandi.', fromMe: true, time: '14:25' }
        ]
    },
    {
        id: 13,
        name: 'Sales',
        count: null,
        lastMessage: 'Xitoydagi mijoz bilan aloqa qildik.',
        users: [
            { id: 1, username: 'User', avatar: User },
            { id: 11, username: 'SalesLead', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'Xitoydagi mijoz bilan aloqa qildik.', fromMe: false, time: '18:00' }
        ]
    },
    {
        id: 14,
        name: 'Mobile Devs',
        count: '04',
        lastMessage: 'iOS build chiqdi!',
        users: [
            { id: 1, username: 'User', avatar: User },
            { id: 12, username: 'iOSDev', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'iOS build chiqdi!', fromMe: true, time: '09:45' },
            { type: 'voice', content: Audio, fromMe: false, time: '09:46' }
        ]
    },
    {
        id: 15,
        name: 'Research',
        count: null,
        lastMessage: 'Yangi texnologiya haqida maqola topdim.',
        users: [
            { id: 1, username: 'User', avatar: User },
            { id: 13, username: 'Researcher', avatar: User }
        ],
        messages: [
            { type: 'text', content: 'Yangi texnologiya haqida maqola topdim.', fromMe: false, time: '11:30' },
            { type: 'image', content: 'images/ai-research.png', fromMe: false, time: '11:31' }
        ]
    }
])


provide('theme', theme)
provide('chats', chats)
provide('selectedUser', selectedUser)
provide('groups', groups)
const handleUserInfo = () => {
    console.log('null')
}
</script>