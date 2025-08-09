import { defineStore } from "pinia";
const token = localStorage.getItem('token' || '')
export const useProfileStore = defineStore('profile', () => {
    const uploadAvater = (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData()
                formData.append('file', file)
                console.log('file', file)
                const res = await fetch(`http://localhost:3000/upload/avatar`, {
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${token}`
                    },
                    body: formData
                })

                if (!res.ok) {
                    return console.log(res?.message || 'Error upload file')
                }

                const body = res.json()
                resolve(body?.message || '')
            } catch (e) {
                reject(e)
            }
        })
    }
    return {
        uploadAvater
    }
})