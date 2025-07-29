import { reactive, ref, computed, onMounted } from 'vue';

const resetPsw = async ({ newPassword, phoneNumber }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('http://localhost:3000/user/update/password', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: phoneNumber.toString(), password: newPassword.toString() })
            })

            const data = await res.json()
            if (!res.ok) {
                reject(data.message || 'Phone number not found!')
            }
            resolve('Update password')
        } catch (e) {
            reject(e)
        }
    })
}


export function useStoreRestPassword() {
    return {
        resetPsw
    }
}
