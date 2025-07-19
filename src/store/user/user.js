import { defineStore } from "pinia";
import { ref } from 'vue'

export const chatsStore = defineStore('chats', () => {

    const theme = ref('light')
    const selectedUser = ref(null)
    const showCard = ref(false)
    const groupCard = ref(false)
    const callStart = ref(false)
    const callType = ref('audio')
    const infoPanel = ref(false)

    return {
        // users,
        // chats,
        // chat_participants,
        // chat_messages,
        theme,
        selectedUser,
        showCard,
        groupCard,
        callStart,
        callType,
        infoPanel
    }

})