import { ref } from "vue";
import socket from '@/socket/socket'
import { socketId } from './call'
export function useSockeTyping() {
    const isTyping = ref(false)
    const timeout = ref(null)

    socket.on('user-typing', () => {
        isTyping.value = true
        if (timeout.value) clearTimeout(timeout.value)
        timeout.value = setTimeout(() => {
            isTyping.value = false
        }, 3000)
    })

    const showTyping = (uid) => {
        socket.emit('user-typing', {
            to: uid,
            from: socketId
        })
    }

    return { isTyping, showTyping }
}