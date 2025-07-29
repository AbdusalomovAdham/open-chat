// chats.js (yoki .ts)
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatsStore = defineStore('chats', () => {
    const chats = ref([])
    const token = ref(localStorage.getItem('token') || '')

    const fetchChatsList = async () => {
        try {
            const res = await fetch('http://localhost:3000/chats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            })

            const data = await res.json()
            if (res.ok) {
                chats.value = data
                return data
            }
        } catch (e) {
            console.error('Xatolik:', e)
        }
    }

    return {
        chats,
        fetchChatsList
    }
})
