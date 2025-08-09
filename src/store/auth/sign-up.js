import { reactive, ref, computed, onMounted } from 'vue';

const SignUp = async ({ username, email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('http://localhost:3000/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await res.json()
            if (!res.ok) return alert(`${data?.message}`)

            localStorage.setItem('token', data?.token || {})

            resolve('wellcome')
        } catch (e) {
            reject(e)
        }
    })
}

export function useAuthSignUp() {
    return {
        SignUp
    }
}