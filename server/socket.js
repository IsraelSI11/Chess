const { Server } = require("socket.io");

module.exports = function (server) {

    let busyUsers = [];

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    io.on("connection", (socket) => {
        const users = obtainAvailableUsers(io, busyUsers);
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
            //Añadimos los usuarios a la lista de ocupados
            busyUsers.push(to);
            busyUsers.push(from);
            let users = obtainAvailableUsers(io, busyUsers);
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

        socket.on("finishgame", ({from}) => {
            //Eliminamos los usuarios de la lista de ocupados
            busyUsers = busyUsers.filter(user => user !== from);
            const users = obtainAvailableUsers(io, busyUsers);
            io.emit("users", users);
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

function obtainAvailableUsers(io, busyUsers){
    return obtainUsers(io).filter(user => !busyUsers.includes(user.userID));
}