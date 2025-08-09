import { io } from 'socket.io-client'
const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    withCredentials: true,
    auth: {
        token: `Bearer ${localStorage.getItem('token')}`
    }
})

export default socket
