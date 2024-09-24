const { Server } = require("socket.io");

module.exports = function (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    io.on("connection", (socket) => {
        const users = obtainUsers(io);
        socket.emit("users", users);
    });

    io.on("connection", (socket) => {
        // Notify existing users
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });
        

        socket.on("inviteuser", ({ username, to }) => {
            console.log("Invitamos a un usuario");
            socket.to(to).emit("invitation", {
                username,
                from: socket.id,
            });
        });

        socket.on("acceptinvitation", ({ to, from }) => {
            io.to(to).to(from).emit("chessview", {
                to: to,
                from: from,
            });
            //Eliminamos los usuarios que estan jugando
            let users = obtainUsers(io).filter(user => user.userID !== to && user.userID !== from);
            io.emit("users", users);
        });

        socket.on("readyforgame", ({ to, from }) => {
            io.to(to).to(from).emit("startgame", {
                white: from,
                userID: to,
            });
        });

        socket.on("move", ({ move, to }) => {
            socket.to(to).emit("move", {
                move: move
            });
        });

        socket.on("finishgame", () => {
            const users = obtainUsers(io);
            socket.emit("users", users);
        });
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });
};

function obtainUsers(io){
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    return users;
}