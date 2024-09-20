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
      userID: '',
      boardConfig: undefined,
      boardApi: undefined,
      color: ''
    };
  },
  components: {
    TheChessboard,
  },
  methods: {
    inviteUser(user: User) {
      socket.emit("inviteuser", {
        username: (socket.auth as { username: string }).username,
        to: user.userID
      });
    },
    handleMove(move: any) {
      let aux: BoardConfig = { viewOnly: true };
      this.boardApi.setConfig(aux);
      socket.emit("move", { move: move, to: this.userID });
    },
    handleCheckmate(isMated: any) {
      if (isMated == this.color) {
        alert("Has perdido!");
      } else {
        alert("Has ganado!");
      }
    },
    updateUserID(userID : String) {
      this.userID = userID;
    },
  },
  mounted() {
    const self = this;
    // Maneja la lista inicial de usuarios
    socket.on("startgame", ({ white, userID }) => {
      const isWhite = white == socket.id;
      self.userID = isWhite ? userID : white;
      self.color = isWhite ? "white" : "black";
      self.boardConfig = {
        orientation: self.color,
        viewOnly: !isWhite
      };
    });

    socket.on("move", ({ move }) => {
      self.boardApi.setConfig({ viewOnly: false, fen: move.after });
    });

    socket.emit("readyforgame", {
      to: self.$route.params.to,
      from: self.$route.params.from,
    });
  },

};
</script>

<template>
  <TheChessboard v-if="boardConfig" :boardConfig="boardConfig" @move="handleMove" @checkmate="handleCheckmate"
    @board-created="(api) => (boardApi = api)" reactive-config />
</template>
