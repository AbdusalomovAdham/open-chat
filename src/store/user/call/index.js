import { defineStore } from 'pinia'
import { ref } from 'vue'
import socket from '@/socket/socket'

export const useCallStore = defineStore('call', () => {

    const localStream = ref(null)
    const remoteStream = ref(null)
    const peerConnection = ref(null)
    const pendingCandidates = ref([])
    const incomingCall = ref(false)
    const incomingOffer = ref(null)
    const callStart = ref(false)
    const onlineUsers = ref([])
    const typingUser = ref(false)
    const typeCall = ref(null)
    const targetUid = ref(null)
    const socketId = ref(null)
    const typingTimeout = ref(null)
    const accepted = ref(false)
    const ended = ref(false)

    function showTyping(uid) {
        socket.emit('user-typing', {
            to: uid,
            from: socketId.value
        })
    }

    socket.on('user-typing', () => {
        typingUser.value = true

        if (typingTimeout.value) {
            clearTimeout(typingTimeout.value)
        }

        typingTimeout.value = setTimeout(() => {
            typingUser.value = false
            typingTimeout.value = null
        }, 1000)

    })

    const config = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    }

    socket.on('socket-id', (payload) => {
        if (!payload.mySocketId) return
        socketId.value = payload.mySocketId
    })

    socket.on('online-user', (payload) => {
        console.log('chaqirildi')
        onlineUsers.value = payload?.onlineUsers || []
        console.log('call store online users', onlineUsers.value)
    })

    socket.on('offer', handleIncomingOffer)
    socket.on('answer', handleAnswer)
    socket.on('ice-candidate', handleRemoteCandidate)
    socket.on('call-end', resetCallState)
    socket.on('decline-call', handleDeclinedCall)
    socket.on('offline-user', offlineUser)

    async function call(callType, userUid) {
        try {

            socket.emit('online-user', { from: socketId.value, user: userUid })

            targetUid.value = userUid
            typeCall.value = callType
            callStart.value = true
            setupPeerConnection()

            const constraints = getMediaConstraints(callType)
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            localStream.value = stream
            stream.getTracks().forEach(track => {
                peerConnection.value.addTrack(track, stream)
            })

            const offer = await peerConnection.value.createOffer()
            await peerConnection.value.setLocalDescription(offer)

            socket.emit('offer', {
                offer,
                type: callType,
                to: targetUid.value,
                from: socketId.value
            })

            console.log(" Offer yuborildi:", offer)
        } catch (error) {
            console.warn("Qo'ng'iroqda xatolik:", error)
        }
    }

    async function acceptCall() {
        if (accepted.value) return;
        incomingCall.value = false
        setupPeerConnection()

        const constraints = getMediaConstraints(typeCall.value)
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        localStream.value = stream
        stream.getTracks().forEach(track => {
            peerConnection.value.addTrack(track, stream)
        })

        await peerConnection.value.setRemoteDescription(
            new RTCSessionDescription(incomingOffer.value)
        )

        const answer = await peerConnection.value.createAnswer()
        await peerConnection.value.setLocalDescription(answer)

        socket.emit('answer', {
            answer,
            type: typeCall.value,
            to: targetUid.value,
            from: socketId.value
        })

        callStart.value = true
        console.log('✅ Qo‘ng‘iroq qabul qilindi.')
        accepted.value = true
    }

    function declineCall() {
        socket.emit('decline-call', {
            to: targetUid.value,
            from: socketId.value,
            type: typeCall.value
        })
        incomingCall.value = false
    }

    async function callEnd() {
        if (ended.value) return
        socket.emit('call-end', {
            type: typeCall.value,
            to: targetUid.value,
            from: socketId.value
        })
        await resetCallState()
        alert('call tugatldi')
        ended.value = true
    }

    function offlineUser() {
        alert('User offline!')
        resetCallState()
    }

    async function resetCallState() {
        await localStream.value?.getTracks().forEach(track => track.stop())
        localStream.value = null

        remoteStream.value = null

        await peerConnection.value?.close()
        peerConnection.value = null

        pendingCandidates.value = []
        incomingCall.value = false
        incomingOffer.value = null
        callStart.value = false
    }


    function setupPeerConnection() {
        peerConnection.value = new RTCPeerConnection(config)

        peerConnection.value.ontrack = (event) => {
            remoteStream.value = event.streams[0]
        }

        peerConnection.value.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', {
                    candidate: event.candidate,
                    to: targetUid.value,
                    from: socketId.value
                })
            }
        }
    }

    function getMediaConstraints(type) {
        return type === 'audio'
            ? { audio: true, video: false }
            : { audio: true, video: true }
    }

    async function handleIncomingOffer(data) {
        incomingCall.value = true
        incomingOffer.value = data.offer
        typeCall.value = data.type
        targetUid.value = data.from
    }

    async function handleAnswer(data) {
        try {
            await peerConnection.value.setRemoteDescription(data.answer)

            for (const candidate of pendingCandidates.value) {
                await peerConnection.value.addIceCandidate(new RTCIceCandidate(candidate))
            }
            pendingCandidates.value = []
            console.log(' Answer o‘rnatildi')
        } catch (error) {
            console.error('Answer o‘rnatishda xatolik:', error)
        }
    }

    async function handleRemoteCandidate(data) {
        try {
            if (peerConnection.value?.remoteDescription?.type) {
                await peerConnection.value.addIceCandidate(new RTCIceCandidate(data.candidate))
            } else {
                console.log('RemoteDescription hali yo‘q, candidate navbatga qo‘shildi')
                pendingCandidates.value.push(data.candidate)
            }
        } catch (error) {
            console.error(' ICE Candidateda xatolik:', error)
        }
    }

    function handleDeclinedCall() {
        alert("Qo‘ng‘iroq rad etildi.")
        resetCallState()
    }

    return {
        localStream,
        remoteStream,
        callStart,
        call,
        callEnd,
        acceptCall,
        declineCall,
        incomingCall,
        typeCall,
        onlineUsers,
        showTyping,
        typingUser
    }
})

// import { defineStore } from 'pinia'
// import { useSockeTyping } from './features/typing'
// import { useSocketCall } from './features/call'
// import { useSocketSignals } from './features/signals'
// import { ref } from 'vue'

// export const useCallStore = defineStore('call', () => {

//     const { typingUser, showTyping } = useSockeTyping()
//     const {
//         call,
//         acceptCall,
//         incomingCall,
//         callStart,
//         declineCall,
//         callEnd,
//         resetCallState,
//         peerConnection,
//         socketId,
//         targetUid,
//         typeCall
//     } = useSocketCall()
//     const { setupSocketListeners, onlineUsers } = useSocketSignals()

//     return {
//         typingUser, showTyping, callStart, call, callEnd, acceptCall, declineCall, setupSocketListeners, incomingCall, resetCallState, onlineUsers, typeCall
//     }
// })
