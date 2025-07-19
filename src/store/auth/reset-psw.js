import { reactive, ref, computed, onMounted } from 'vue';

const resetPsw = async ({ newPassowrd, email }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/data/users.json')
            const data = await res.json()
            console.log(email)
            const user = data.some(user => user?.email === email)
            console.log('email', user)
            if (!user) return reject({ message: 'Email error!' })
            resolve(data?.uid)
        } catch (e) {
            console.error(e)
        }
    })
}


export default function useStoreRestPassword() {
    return {
        resetPsw
    }
}
