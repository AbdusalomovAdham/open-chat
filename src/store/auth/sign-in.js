import { reactive, ref, computed, onMounted } from 'vue';

const SignIn = async ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/data/users.json')
            const data = await res.json()
            const userExists = data.find(user => user.username === username && user.password === password)

            if (!userExists) return reject({ message: 'Username or Password error!' })
            localStorage.setItem('userId', userExists.uid)
            console.log('data', userExists.uid)
            resolve(userExists.uid)
        } catch (e) {
            console.error(e)
        }
    })
}

export default function useAuthSignIn() {
    return {
        SignIn
    }
}
