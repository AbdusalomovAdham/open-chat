import { reactive, ref, computed, onMounted } from 'vue';

const SignUp = async ({ username, email, password }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(username)
            const res = await fetch('/data/users.json')
            const data = await res.json()
            const userExists = data.some(user => user.username === username)
            if (userExists) return reject({ message: 'already username!' })
            const userId = `uid${data.length + 1}`
            localStorage.setItem('userId', userId)
            resolve(userId)
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })
}

export function useAuthSignUp() {
    return {
        SignUp
    }
}