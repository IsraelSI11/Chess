<script lang="ts">
import { socket } from '@/sockets';
import InvitationDialog from './InvitationDialog.vue';

interface User {
    userID: string;
    username: string;
    self?: boolean;
}

export default {
    data() {
        return {
            users: [] as User[],
            userID: '',
            boardConfig: undefined,
            boardApi: undefined,
            color: ''
        };
    },
    components: {
        InvitationDialog,
    },
    methods: {
        inviteUser(user: User) {
            socket.emit("inviteuser", {
                username: (socket.auth as { username: string }).username,
                to: user.userID
            });
        },
        updateUserID(userID: String) {
            this.userID = userID;
        },
    },
    mounted() {
        const self = this;
        // Maneja la lista inicial de usuarios
        socket.on("users", (users) => {
            console.log("on users")
            console.log(users)
            users.forEach((user: User) => {
                user.self = user.userID === socket.id;
            });
            // Poner al usuario actual primero, y luego ordenar por nombre
            self.users = users.sort((a: User, b: User) => {
                if (a.self) return -1;
                if (b.self) return 1;
                return a.username.localeCompare(b.username);
            });
        });

        socket.on("chessview", ({ to, from }) => {
            this.$router.push({ path: `/chess/${to}/${from}` });
        });

        // Evento para manejar la conexión de un nuevo usuario
        socket.on("user connected", (user: User) => {
            self.users.push(user);
        });
    },

};
</script>

<template>
    <div class="user-container">
        <h1>Usuarios</h1>
        <ul>
            <li v-for="user in users" :key="user.userID" class="user-item">
                <span class="username">{{ user.username }}</span> 
                <span v-if="user.self" class="self-tag">(Tú)</span>
                <span v-else class="invite-btn">
                    <button @click="inviteUser(user)">Conectar</button>
                </span>
            </li>
        </ul>
    </div>
    <InvitationDialog :userID="userID" @update-user-id="updateUserID" />
</template>

<style scoped>

.user-container {
    min-width: 50em;
    max-width: 65em;
    margin: 0 auto;
    padding: 2em;
    background-color: #f4f4f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h1 {
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1.5em;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    margin-bottom: 1em;
    padding: 1em 1.5em;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.username {
    font-weight: bold;
    color: #34495e;
}

.self-tag {
    color: #2ecc71;
    font-style: italic;
}

.invite-btn button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.invite-btn button:hover {
    background-color: #2980b9;
    transform: scale(1.05);
}
</style>
