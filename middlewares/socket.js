var clients = []

module.exports = (app, io, db) => {
    io.on('connection', function (socket) {
        console.log(`${socket.id} connected`);
        socket.on('join', ({ uid }) => {
            var clientInfo = new Object()
            clientInfo.uid = uid
            clientInfo.sid = socket.id
            clients[uid] = clientInfo
            console.log(clients);
            socket.join('api')
            // console.log(uid, 'join api room');
            console.log(socket.rooms);
            socket.emit('join', { id: socket.id })
        })
        socket.on('leave', ({ uid }) => {
            console.log(uid, 'leave api room');
            socket.leave('api')
            delete clients[uid]

        })
        socket.on('disconnect', function () {
            console.log(clients, socket.id);
            for (var client in clients) {
                console.log(client);
                if (clients[client].sid === socket.id) {
                    delete clients[client]
                    break
                }
            }
        })

        socket.on('send_post_req', function (data) {
            console.log(data)
            socket.broadcast.to('api').emit('send_post_req' , {data})
        })

        socket.on('send_message' , function(data) {
            console.log(data);
            socket.broadcast.to('api').emit('receive_message' , {data})
        })

        
    })

}
