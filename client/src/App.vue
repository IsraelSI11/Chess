<script setup>
import TheChessView from './components/TheChessView.vue';
import { socket } from './sockets';

socket.off();


</script>


<template>
  <div id="app">
    <router-view />
  </div>
</template>