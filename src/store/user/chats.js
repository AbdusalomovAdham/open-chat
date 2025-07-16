import { defineStore } from "pinia";
import { ref } from 'vue'

export const chatsStore = defineStore('chats', () => {
    const users = ref([
        {
            id: 1,
            uid: "u001",
            username: "johnny",
            full_name: "John Walker",
            password: "hashedpass1",
            avatar: "/avatars/john.png"
        },
        {
            id: 2,
            uid: "u002",
            username: "lisa",
            full_name: "Lisa Monroe",
            password: "hashedpass2",
            avatar: "/avatars/lisa.png"
        },
        {
            id: 3,
            uid: "u003",
            username: "ali",
            full_name: "Ali Karimov",
            password: "hashedpass3",
            avatar: "/avatars/ali.png"
        },
        {
            id: 4,
            uid: "u004",
            username: "masha",
            full_name: "Masha Petrova",
            password: "hashedpass4",
            avatar: "/avatars/masha.png"
        },
        {
            id: 5,
            uid: "u005",
            username: "elon",
            full_name: "Elon Maskov",
            password: "hashedpass5",
            avatar: "/avatars/elon.png"
        }
    ])

    const chats = ref([
        {
            id: 1,
            uid: "c001",
            type: "P2P",
            created_at: "2025-07-15T09:00:00Z",
            created_by: "u001"
        },
        {
            id: 2,
            uid: "c002",
            type: "P2P",
            created_at: "2025-07-15T09:30:00Z",
            created_by: "u002"
        },
        {
            id: 3,
            uid: "c003",
            type: "GROUP",
            created_at: "2025-07-15T10:00:00Z",
            created_by: "u003"
        },
        {
            id: 4,
            uid: "c004",
            type: "GROUP",
            created_at: "2025-07-15T10:15:00Z",
            created_by: "u004"
        },
        {
            id: 5,
            uid: "c005",
            type: "P2P",
            created_at: "2025-07-15T11:00:00Z",
            created_by: "u005"
        }

    ])

    const chat_participants = ref([
        {
            id: 1,
            uid: "p001",
            user_uid: "u001",
            chat_uid: "c001"
        },
        {
            id: 2,
            uid: "p002",
            user_uid: "u002",
            chat_uid: "c001"
        },
        {
            id: 3,
            uid: "p003",
            user_uid: "u002",
            chat_uid: "c002"
        },
        {
            id: 4,
            uid: "p004",
            user_uid: "u003",
            chat_uid: "c002"
        },
        {
            id: 5,
            uid: "p005",
            user_uid: "u003",
            chat_uid: "c003"
        },
        {
            id: 6,
            uid: "p006",
            user_uid: "u004",
            chat_uid: "c003"
        },
        {
            id: 7,
            uid: "p007",
            user_uid: "u005",
            chat_uid: "c003"
        },
        {
            id: 8,
            uid: "p008",
            user_uid: "u001",
            chat_uid: "c004"
        },
        {
            id: 9,
            uid: "p009",
            user_uid: "u003",
            chat_uid: "c004"
        },
        {
            id: 10,
            uid: "p010",
            user_uid: "u005",
            chat_uid: "c004"
        },
        {
            id: 11,
            uid: "p011",
            user_uid: "u004",
            chat_uid: "c005"
        },
        {
            id: 12,
            uid: "p012",
            user_uid: "u005",
            chat_uid: "c005"
        }
    ])

    const chat_messages = ref([{
        id: 1,
        uid: "m001",
        chat_uid: "c001",
        text: "Hey Lisa, what's up?",
        created_at: "2025-07-15T12:00:00Z",
        created_by: "u001"
    },
    {
        id: 2,
        uid: "m002",
        chat_uid: "c001",
        text: "Hi John! All good, you?",
        created_at: "2025-07-15T12:01:00Z",
        created_by: "u002"
    },
    {
        id: 3,
        uid: "m003",
        chat_uid: "c001",
        text: "Working on the new design.",
        created_at: "2025-07-15T12:02:00Z",
        created_by: "u001"
    },
    {
        id: 4,
        uid: "m004",
        chat_uid: "c001",
        text: "Nice! Send it to me later.",
        created_at: "2025-07-15T12:03:00Z",
        created_by: "u002"
    },
    {
        id: 5,
        uid: "m005",
        chat_uid: "c001",
        text: "Sure. Will do!",
        created_at: "2025-07-15T12:04:00Z",
        created_by: "u001"
    },

    {
        id: 6,
        uid: "m006",
        chat_uid: "c002",
        text: "Ali, have you reviewed the code?",
        created_at: "2025-07-15T13:00:00Z",
        created_by: "u002"
    },
    {
        id: 7,
        uid: "m007",
        chat_uid: "c002",
        text: "Yes, looks good overall.",
        created_at: "2025-07-15T13:01:00Z",
        created_by: "u003"
    },
    {
        id: 8,
        uid: "m008",
        chat_uid: "c002",
        text: "Cool. Let's deploy today.",
        created_at: "2025-07-15T13:02:00Z",
        created_by: "u002"
    },
    {
        id: 9,
        uid: "m009",
        chat_uid: "c002",
        text: "Alright, pushing now.",
        created_at: "2025-07-15T13:03:00Z",
        created_by: "u003"
    },
    {
        id: 10,
        uid: "m010",
        chat_uid: "c002",
        text: "Thanks Ali 👍",
        created_at: "2025-07-15T13:04:00Z",
        created_by: "u002"
    },

    {
        id: 11,
        uid: "m011",
        chat_uid: "c003",
        text: "Hello team, meeting at 4 PM.",
        created_at: "2025-07-15T14:00:00Z",
        created_by: "u003"
    },
    {
        id: 12,
        uid: "m012",
        chat_uid: "c003",
        text: "Got it!",
        created_at: "2025-07-15T14:01:00Z",
        created_by: "u004"
    },
    {
        id: 13,
        uid: "m013",
        chat_uid: "c003",
        text: "Will join from mobile.",
        created_at: "2025-07-15T14:02:00Z",
        created_by: "u005"
    },
    {
        id: 14,
        uid: "m014",
        chat_uid: "c003",
        text: "Okay, link will be sent soon.",
        created_at: "2025-07-15T14:03:00Z",
        created_by: "u003"
    },
    {
        id: 15,
        uid: "m015",
        chat_uid: "c003",
        text: "Thanks!",
        created_at: "2025-07-15T14:04:00Z",
        created_by: "u005"
    },

    {
        id: 16,
        uid: "m016",
        chat_uid: "c004",
        text: "Masha, did you upload the report?",
        created_at: "2025-07-15T15:00:00Z",
        created_by: "u001"
    },
    {
        id: 17,
        uid: "m017",
        chat_uid: "c004",
        text: "Yes, check the drive.",
        created_at: "2025-07-15T15:01:00Z",
        created_by: "u004"
    },
    {
        id: 18,
        uid: "m018",
        chat_uid: "c004",
        text: "File received. Good job.",
        created_at: "2025-07-15T15:02:00Z",
        created_by: "u003"
    },
    {
        id: 19,
        uid: "m019",
        chat_uid: "c004",
        text: "Thanks 🙌",
        created_at: "2025-07-15T15:03:00Z",
        created_by: "u004"
    },
    {
        id: 20,
        uid: "m020",
        chat_uid: "c004",
        text: "Keep it up team!",
        created_at: "2025-07-15T15:04:00Z",
        created_by: "u005"
    },

    {
        id: 21,
        uid: "m021",
        chat_uid: "c005",
        text: "Hey Elon, what's the next move?",
        created_at: "2025-07-15T16:00:00Z",
        created_by: "u004"
    },
    {
        id: 22,
        uid: "m022",
        chat_uid: "c005",
        text: "We’re launching next week.",
        created_at: "2025-07-15T16:01:00Z",
        created_by: "u005"
    },
    {
        id: 23,
        uid: "m023",
        chat_uid: "c005",
        text: "Exciting!",
        created_at: "2025-07-15T16:02:00Z",
        created_by: "u004"
    },
    {
        id: 24,
        uid: "m024",
        chat_uid: "c005",
        text: "Let's prep everything.",
        created_at: "2025-07-15T16:03:00Z",
        created_by: "u005"
    },
    {
        id: 25,
        uid: "m025",
        chat_uid: "c005",
        text: "On it!",
        created_at: "2025-07-15T16:04:00Z",
        created_by: "u004"
    }


    ])

    return {
        users,
        chats,
        chat_participants,
        chat_messages
    }

})