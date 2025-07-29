import { reactive, ref, computed, onMounted } from 'vue';
// import {api} from '@/plugins/axios'

const token = localStorage.getItem('token')
const contactList = ref([])
const contactInfo = ref({})

const fetchContacts = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('http://localhost:3000/contacts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res?.json()
            if (!res.ok) return alert(`${data?.message}`)
            contactList.value = data
            resolve(data?.message)
        } catch (e) {
            reject(e)
        }
    })
}

const create = async (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('http://localhost:3000/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username })
            })
            const data = await res.json()
            if (!res.ok) reject(data.message)
            await fetchContacts()
            resolve(res)
        } catch (e) { reject(e) }
    })
}

const deleteByUid = (contact) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('http://localhost:3000/contacts', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ contact_uid: contact?.contact?.uid })
            })
            const data = await res.json()
            if (!res.ok) return alert(`${data?.message}`)
            resolve(data)
        } catch (e) {
            reject(e)
        }
    })
}

export function useStoreContacts() {
    return {
        fetchContacts,
        deleteByUid,
        create,
        contactList,
        contactInfo
    }
}