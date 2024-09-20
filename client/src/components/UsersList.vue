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
    <div>
        <h2>Users</h2>
        <ul>
            <li v-for="user in users" :key="user.userID">{{ user.username }} <span v-if="user.self">(You)</span> <span
                    v-else><button @click="inviteUser(user)">Conectar</button></span></li>
        </ul>
    </div>
    <InvitationDialog :userID="userID" @update-user-id="updateUserID" />
</template>
