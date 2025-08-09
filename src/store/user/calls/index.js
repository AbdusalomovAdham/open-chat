import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallsStore = defineStore('calls', () => {
    const token = ref(localStorage.getItem('token' || ''))
    const callList = ref([])
    const fetchList = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`http://localhost:3000/calls`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.value}`
                    }
                })

                if (!res.ok) {
                    console.error(res?.message || 'Error get call list')
                }
                const data = await res.json()
                callList.value = data
                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    }


    return {
        fetchList,
        callList
    }
})