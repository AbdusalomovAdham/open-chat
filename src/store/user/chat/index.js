import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'
import socket from '@/socket/socket'
import { useRoute } from 'vue-router'

export const useChatStore = defineStore('chat', () => {
    const route = useRoute()
    const uid = ref(route.params.uid)
    const receiverUsername = ref('')
    const messages = ref([])
    const senderUsername = ref(localStorage.getItem('username') || '')
    const userDetail = ref({})
    const token = ref(localStorage.getItem('token') || '')
    const fetchInfo = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`http://localhost:3000/user/info/${uid.value}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json()
                if (!res.ok) {
                    alert('not found user')
                    reject(res.statusText)
                }
                console.log('userdetail', data.user)
                userDetail.value = data?.user
                console.log(userDetail.value)
                receiverUsername.value = data?.user?.username
                await addRoomUser(data?.user?.username)
                resolve(data)
            } catch (err) {
                console.error('User olishda xato:', err)
                reject(err)
            }
        })
    }

    const addRoomUser = async (receiverName) => {
        const roomId = [senderUsername.value, receiverName].sort().join('_')
        socket.emit('join_room', {
            roomId,
            username: senderUsername.value
        })
        console.log('Join room emitted:', roomId)
    }

    const getAllMessage = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`http://localhost:3000/chats/messages/${uid.value}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'applicaton/json',
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                const data = await res.json()
                if (!res.ok) reject('Error get messages')
                messages.value = data
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }

    const sendMessage = async (text) => {
        if (!text) return
        socket.emit('send_message', {
            roomId: [senderUsername.value, receiverUsername.value].sort().join('_'),
            user_uid: uid.value,
            message: text,
            token: `Bearer ${token.value}`
        })
    }

    socket.on('load_messages', async (data) => {
        messages.value = data
    })

    socket.on('receive_message', async (msg) => {
        messages.value.push(msg)
        await getAllMessage()
    })

    onMounted(() => {
        if (uid.value) {
            fetchInfo()
        }
    })

    watch(() => route.params.uid, async (newUid) => {
        console.log('route.params.uid changed:', newUid)
        if (!newUid) return
        uid.value = newUid
        await fetchInfo()
        await getAllMessage()
    })

    return {
        messages,
        senderUsername,
        sendMessage,
        fetchInfo,
        userDetail,
        getAllMessage
    }
})
