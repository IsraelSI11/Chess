<script>
import { socket } from '@/sockets';

export default {
    data() {
        return {
            usernameAlreadySelected: false,
            username: ''
        };
    },
    methods: {
        connectUser() {
            this.usernameAlreadySelected = true;
            let username = this.username;
            socket.auth = { username };
            socket.connect();
            this.$router.push({ name: "Home" });
        }
    },
    destroyed() {
        socket.off("connect_error");
    },
    mounted() {
        //Si hay un usuario seleccionado redirigimos a la vista de juego
        if (this.usernameAlreadySelected) {
            this.$router.push({ name: "Game" });
        }
    }
};

socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
    }
});
</script>

<template>
    <input type="text" v-model="username" placeholder="Enter your username" />
    <button @click="connectUser">Connect</button>
</template>
