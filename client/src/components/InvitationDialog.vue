<script lang="ts">
import { socket } from '@/sockets';

export default {
    props: {
        username: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        resetProps() {
            this.username = '';
            this.show = false;
        },
        accept() {
            socket.emit('acceptinvitation', {
                to: this.userID,
                from: socket.id
            });
        },
        decline() {
            this.resetProps();
        }
    }
};
</script>

<template>
    <div v-if="show">
        <h2>Invitation</h2>
        <p>{{ username }} has invited you to play a game</p>
        <button @click="accept">Accept</button>
        <button @click="decline">Decline</button>
    </div>
</template>
