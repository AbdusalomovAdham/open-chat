import { reactive, ref, computed, onMounted } from 'vue';

const SignIn = async ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            localStorage.setItem('username', username)
            const res = await fetch('http://localhost:3000/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.toString(),
                    password: password.toString()
                })
            })
            const data = await res.json()

            if (!res.ok) reject('Error password or username' || data?.message)

            localStorage.setItem('token', data?.token || {})
            resolve(data?.token)
        } catch (e) {
            reject(e)
        }
    })
}

export function useAuthSignIn() {
    return {
        SignIn
    }
}
