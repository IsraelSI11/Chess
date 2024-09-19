<script lang="ts">
import { BoardApi, BoardConfig, TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { socket } from '@/sockets';
import InvitationDialog from './InvitationDialog.vue';
import { readonly } from 'vue';

interface User {
  userID: string;
  username: string;
  self?: boolean;
}

export default {
  data() {
    return {
      users: [] as User[],
      showInvitation: false,
      username: '',
      userID: '',
      boardConfig: undefined,
      boardApi : undefined,
    };
  },
  components: {
    TheChessboard,
    InvitationDialog
  },
  methods: {
    inviteUser(user: User) {
      socket.emit("inviteuser", {
        username: (socket.auth as { username: string }).username,
        to: user.userID
      });
    },
    handleMove(move: any) {
      let aux : BoardConfig = {viewOnly: true};
      
      this.boardApi.setConfig(aux);

      console.log(this.boardConfig,this.boardApi)
      console.log(this.userID,socket.id)
      socket.emit("move", { move: move, to: this.userID });
    }
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

    socket.on("invitation", ({ username, from }) => {
      self.username = username;
      self.userID = from;
      self.showInvitation = true;
    });

    socket.on("startgame", ({ white, userID }) => {
      const isWhite = white == socket.id;
      self.userID = isWhite ? self.userID : userID;
      const color = isWhite ? "white" : "black";
      self.boardConfig = {
        orientation: color,
        viewOnly: !isWhite
      };
      console.log(self.boardConfig)
    });

    socket.on("move", ({ move }) => {
      self.boardApi.setConfig({viewOnly: false, fen: move.after});
    });

    // Evento para manejar la conexión de un nuevo usuario
    socket.on("user connected", (user: User) => {
      self.users.push(user);
    });
  },

};
</script>

<template>
  <TheChessboard v-if="boardConfig" :boardConfig="boardConfig" @move="handleMove" @board-created="(api) => (boardApi = api)" reactive-config/>
  <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.userID">{{ user.username }} <span v-if="user.self">(You)</span> <span
          v-else><button @click="inviteUser(user)">Conectar</button></span></li>
    </ul>
  </div>
  <InvitationDialog :username="username" :show="showInvitation" :userID="userID" />
</template>
