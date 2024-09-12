<script setup>
import TheChessView from './components/TheChessView.vue';
import { socket } from './sockets';

socket.off();
</script>

<template>
  <TheChessView />
</template>