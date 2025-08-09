import { socketId, pendingCandidates, resetCallState, incomingCall, incomingOffer, typeCall, targetUid, peerConnection } from './call'
import socket from '@/socket/socket'
import { ref } from 'vue'
export function useSocketSignals() {
    const onlineUsers = ref([])
    function setupSocketListeners() {
        try {
            socket.on('offer', handleIncomingOffer)
            socket.on('answer', handleAnswer)
            socket.on('ice-candidate', handleRemoteCandidate)
            socket.on('call-end', resetCallState)
            socket.on('decline-call', handleDeclinedCall)
            socket.on('offline-user', offlineUser)
            socket.on('socket-id', (payload) => {
                if (!payload.mySocketId) return
                socketId.value = payload.mySocketId
            })

            socket.on('online-user', (payload) => {
                console.log('chaqirildi')
                onlineUsers.value = payload?.onlineUsers || []
                console.log('call store online users', onlineUsers.value)
            })
        } catch (e) {
            console.error(e)
        }
    }

    function handleIncomingOffer(data) {
        try {
            incomingCall.value = true
            incomingOffer.value = data.offer
            typeCall.value = data.callType
            targetUid.value = data.from
        } catch (e) { console.error(e) }
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
        try {
            alert("Qo‘ng‘iroq rad etildi.")
            resetCallState()
        } catch (e) {
            console.error(e)
        }
    }

    function offlineUser() {
        try {
            alert('User offline!')
            resetCallState()
        } catch (e) {
            console.error(e)
        }
    }
    return {
        setupSocketListeners,
        onlineUsers
    }
}