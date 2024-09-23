<script lang="ts">
import { socket } from '@/sockets';

export default {
    props: {
        userID: {
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
        resetProps() {
            this.username = '';
            this.show = false;
            this.userID = '';
        },
        accept() {
            socket.emit('acceptinvitation', {
                to: this.userID,
                from: socket.id
            });
        },
        decline() {
            this.resetProps();
        },
        emitUpdateUserID(userID) {
            this.$emit('update-user-id', userID);
        },
    },
    mounted() {
        const self=this;
        socket.on("invitation", ({ username, from }) => {
            self.username = username;
            self.emitUpdateUserID(from);
            self.show = true;
        });
    },
};
</script>

<template>
    <div class="invitation-dialog" v-if="show">
        <h2>Invitación</h2>
        <p>{{ username }} te ha invitado a jugar una partida</p>
        <div class="dialog-buttons">
            <button @click="accept" class="accept-btn">Aceptar</button>
            <button @click="decline" class="decline-btn">Rechazar</button>
        </div>
    </div>
</template>

<style scoped>

.invitation-dialog {
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

.dialog-buttons {
    display: flex;
    justify-content: space-between;
}

.accept-btn, .decline-btn {
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
