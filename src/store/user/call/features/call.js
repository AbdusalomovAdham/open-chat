import { ref } from 'vue'
import socket from '@/socket/socket'
export function useSocketCall() {
    const typeCall = ref(null)
    const localStream = ref(null)
    const remoteStream = ref(null)
    const incomingCall = ref(null)
    const callStart = ref(false)
    const peerConnection = ref(null)
    const incomingOffer = ref(null)
    const pendingCandidates = ref(null)
    const targetUid = ref(null)
    const socketId = ref(null)
    const config = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    }

    async function call(callType, userUid) {
        try {
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
                callType,
                to: targetUid.value,
                from: socketId
            })
            console.log("Offer yuboridi: ", offer)
        } catch (e) {
            console.error(e)
        }
    }

    async function acceptCall() {
        try {
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
                to: targetUid.value,
                from: socketId.value
            })

            callStart.value = true
            console.log('✅ Qo‘ng‘iroq qabul qilindi.')
        } catch (e) {
            console.error(e)
        }
    }

    function declineCall() {
        try {
            incomingCall.value = false
            socket.emit('decline-call', {
                to: targetUid.value,
                from: socketId.value
            })
        } catch (e) {
            console.error(e)
        }
    }

    function callEnd() {
        try {
            socket.emit('call-end', {
                to: targetUid.value,
                from: socketId
            })
            resetCallState()
        } catch (e) {
            console.error(e)
        }
    }

    function resetCallState() {
        try {
            localStream.value?.getTracks().forEach(track => track.stop())
            localStream.value = null
            remoteStream.value = null
            peerConnection.value?.close()
            peerConnection.value = null
            pendingCandidates.value = []
            incomingCall.value = false
            incomingCall.value = null
            callStart.value = false
        } catch (e) { console.error(e) }
    }

    function setupPeerConnection() {
        try {
            peerConnection.value = new RTCPeerConnection(config)
            peerConnection.value.ontrack = (event) => {
                remoteStream.value = event.streams[0]
            }
            peerConnection.value.ondicecandidate = event => {
                if (event.candidate) {
                    socket.emit('ice-candidate', {
                        candidate: event.candidate,
                        to: targetUid,
                        from: socketId
                    })
                }
            }
        } catch (e) { console.error(e) }

    }

    function getMediaConstraints(type) {
        return type === 'audio'
            ? { audio: true, video: false }
            : { audio: true, video: true }
    }


    return {
        call,
        acceptCall,
        incomingCall,
        callStart,
        declineCall,
        callEnd,
        resetCallState,
        peerConnection,
        socketId,
        targetUid,
    }
}