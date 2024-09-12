<script lang="ts">
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { socket } from '@/sockets';

interface User {
  userID: string;
  username: string;
  self?: boolean;
}

export default {
  data() {
    return {
      users: [] as User[],
    };
  },
  components: {
    TheChessboard,
  },
  mounted() {
    const self = this;

    // Maneja la lista inicial de usuarios
    socket.on("users", (users) => {
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
      console.log(self.users)
    });

    // Evento para manejar la conexión de un nuevo usuario
    socket.on("user connected", (user: User) => {
      self.users.push(user);
    });
  },
};
</script>

<template>
  <TheChessboard />
  <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.userID">{{ user.username }} <span v-if="user.self">(You)</span></li>
    </ul>
  </div>
</template>
