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
    <div v-if="show">
        <h2>Invitation</h2>
        <p>{{ username }} has invited you to play a game</p>
        <button @click="accept">Accept</button>
        <button @click="decline">Decline</button>
    </div>
</template>
