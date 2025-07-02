import { reactive, ref, computed, onMounted } from 'vue';
// import api from '@/plugins/axios'

const SignIn = async ({ email, password }) => {
    try {
        console.log(email, password)
        // const res = await api.post('/sign-in', { password, email })
        // const { token } = res?.data || {}
        // localStorage.setItem('token', token)
        // if(!token) return false

        return true
    } catch (e) { console.error(e) }
}

export function useAuthSignIn() {
    return {
        SignIn
    }
}
