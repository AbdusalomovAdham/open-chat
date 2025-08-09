import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore('setting', () => {
    const token = ref(localStorage.getItem('token') || '')
    const user = ref({})
    const userInfo = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('http://localhost:3000/user/info', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token.value}`
                    }
                })

                if (!res.ok) {
                    reject(res?.message || 'data not yet')
                }

                const data = await res.json()
                user.value = data?.user || []
                resolve(data)
            } catch (e) {
                reject(new Error(`Fetch failed: ${e.message}`))
            }
        })
    }


    const updateUser = (body) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch('http://localhost:3000/user', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.value}`
                    },
                    body: JSON.stringify(body)
                })
                if (!res.ok) {
                    return console.error(res)
                }
                alert('update')
                const data = await res.json()
                await userInfo()
                resolve(data)
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }
    return {
        user,
        userInfo,
        updateUser
    }
})