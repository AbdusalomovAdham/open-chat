import { ref } from 'vue'

// 1. Foydalanuvchi UID ni localStorage dan olamiz
const userUid = ref(localStorage.getItem('userId'))

// 2. Chatlar massivini reactive qilamiz
const chats = ref([])

const chatsList = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            // 3. JSON fayllarni bir vaqtning o'zida fetch qilamiz
            const [participantsRes, usersRes, favouritesRes] = await Promise.all([
                fetch('/data/chat_participants.json'),
                fetch('/data/users.json'),
                fetch('/data/favourite_chats.json')
            ])

            const participants = await participantsRes.json()
            const users = await usersRes.json()
            const favourites = await favouritesRes.json()

            // 4. Mening qatnashgan chatlarimni topamiz
            const myChats = participants.filter(p => p.user_uid === userUid.value)
            const chatUids = myChats.map(p => p.chat_uid)

            // 5. Mening sevimli chatlarimni topamiz
            const myFavouriteChatUids = favourites
                .filter(f => f.user_uid === userUid.value)
                .map(f => f.chat_uid)

            // 6. Har bir chat uchun user ma’lumotlari va favourite statusini joylaymiz
            const chatList = chatUids.map(chatUid => {
                // Chatdagi barcha a’zolar
                const members = participants.filter(p => p.chat_uid === chatUid)

                // Men bo‘lmagan userni topamiz (faqat P2P uchun)
                const otherUser = members.find(m => m.user_uid !== userUid.value)

                // User ma'lumotini topamiz
                const userInfo = users.find(u => u.uid === otherUser?.user_uid)

                return {
                    chat_uid: chatUid,
                    user: userInfo || null,
                    is_favourite: myFavouriteChatUids.includes(chatUid)
                }
            })

            // 7. Chatlar holatini saqlaymiz
            chats.value = chatList

            // 8. Resolve qilib jo'natamiz
            console.log('chat list', chatList)
            resolve(chatList)

        } catch (err) {
            reject(err)
        }
    })
}

// 9. Export qilib tashqarida ishlatamiz
export default function useChatsStore() {
    return {
        chats,
        chatsList
    }
}
