<script lang="ts">

import { socket } from '@/sockets';

export default {
    props: {
        draw: {
            type: Boolean,
            required: true,
        },
        result: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            show: false,
            username: '',
        };
    },
    methods: {
        accept() {
            //Notificamos al servidor de que el usuario vuelve a estar disponible
            socket.emit('finishgame');
            this.$router.push({ name: "Home" });
        },
    }
};
</script>

<template>
    <div class="result-dialog" v-show="draw || result!=''">
        <h2>Resultado</h2>
        <p v-if="!draw">Han ganado las {{ result }}</p>
        <p v-else>La partida ha terminado en empate</p>
        <button @click="accept" class="accept-btn">Aceptar</button>
    </div>
</template>

<style scoped>

.result-dialog {
    background-color: #ffffff;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: 2em auto;
    text-align: center;
    animation: slide-in 0.5s ease-out;
}

h2 {
    font-size: 1.75rem;
    color: #2c3e50;
    margin-bottom: 1em;
}

p {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-bottom: 2em;
}

.accept-btn {
    padding: 0.75em 1.5em;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.accept-btn {
    background-color: #2ecc71;
    color: white;
}

.accept-btn:hover {
    background-color: #27ae60;
    transform: scale(1.05);
}

.decline-btn {
    background-color: #e74c3c;
    color: white;
}

.decline-btn:hover {
    background-color: #c0392b;
    transform: scale(1.05);
}

@keyframes slide-in {
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
