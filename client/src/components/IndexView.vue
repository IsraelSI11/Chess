<script>
import ConnectUser from './ConnectUser.vue';
export default {
    components: {
        ConnectUser
    },
};
</script>

<template>
    <div class="container">
        <div class="content-wrapper">
            <h1>Bienvenido a Chess 2.0</h1>
            <p>Juega contra personas de todo el mundo. ¡Conviértete en un maestro del ajedrez hoy mismo!</p>
            <img src="/chessboard.png" alt="chessboard" class="chessboard-img" />
        </div>
        <div class="connect-user-container">
            <h2>¡Juega al ajedrez online con nuestra página!</h2>
            <p>Conéctate, invita a un oponente y empieza a jugar.</p>
            <ConnectUser />
        </div>
    </div>
</template>

<style lang="css" scoped>
h1 {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: #2c3e50;
    margin-bottom: 0.5em;
}

h2 {
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    color: #333;
}

p {
    font-size: 1.2rem;
    color: #7f8c8d;
    text-align: center;
}

.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f9;
    padding: 2em;
    border-radius: 3em;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap; /* Permite que los elementos se ajusten en pantallas pequeñas */
}

.content-wrapper {
    text-align: center;
    margin-right: 4em;
    max-width: 600px; /* Limita el ancho máximo del contenido */
}

.connect-user-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    max-width: 300px;
}

.chessboard-img {
    width: 100%;
    max-width: 500px;
    margin-top: 1em;
    height: auto;
    border-radius: 10px;
    transition: transform 0.3s ease;
}

.chessboard-img:hover {
    transform: rotate(3deg) scale(1.05);
}

@media (max-width: 768px) {
    .container {
        flex-direction: column; /* Cambia a columna en pantallas pequeñas */
        padding: 1.5em;
        gap: 2em;
    }

    .content-wrapper {
        margin-right: 0;
        margin-bottom: 2em; /* Añade margen en pantallas pequeñas */
    }

    h1 {
        font-size: 2rem; /* Reduce el tamaño del h1 en pantallas pequeñas */
    }

    h2 {
        font-size: 1.5rem; /* Reduce el tamaño del h2 en pantallas pequeñas */
    }

    p {
        font-size: 1rem; /* Reduce el tamaño del texto en pantallas pequeñas */
    }

    .chessboard-img {
        max-width: 300px; /* Ajusta el tamaño de la imagen en pantallas pequeñas */
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.75rem; /* Ajuste adicional para móviles muy pequeños */
    }

    h2 {
        font-size: 1.25rem; /* Ajuste adicional para móviles muy pequeños */
    }

    p {
        font-size: 0.9rem; /* Ajuste adicional para móviles muy pequeños */
    }

    .chessboard-img {
        max-width: 250px; /* Ajuste para imágenes en pantallas muy pequeñas */
    }
}

</style>