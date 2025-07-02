import { reactive, ref, computed, onMounted } from 'vue';
// import api from '@/plugins/axios'

const SignUp = async ({ firstName, lastName, email, password }) => {
    try {
        console.log(firstName, lastName)
        if (!firstName|| !lastName || !email || !password) return false
        console.log(firstName, lastName, email, password)

        // const res = await api.post('/sign-up', { firstName, lastName, email, password })
        // const { token } = res?.data || {}
        // localStorage.setItem('token', token)
        // if(!token) return false
        return true
    } catch (e) { console.error(e) }

}

export function useAuthSignUp() {
    return {
        SignUp
    }
}