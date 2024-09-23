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
    <section>
        <label for="username">Nombre de usuario</label>
        <input id="username" name="username" type="text" v-model="username" placeholder="Introduce tu nombre de usuario" />
        <button @click="connectUser">Conectarse</button>
    </section>
</template>

<style lang="css" scoped>

section{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#7f8c8d;
}

input {
    margin-top: 0.5em;
    margin-bottom: 2em;
    padding: 1.2em;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1em;
    width: 85%;
}

button {
    padding: 0.75em 2em;
    font-size: 1.1rem;
    color: white;
    background-color: #429942;
    border: none;
    border-radius: 1em;
    cursor: pointer;
}

button:hover {
    background-color: #02350a;
}


</style>