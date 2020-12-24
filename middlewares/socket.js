var client = []

module.exports = (app, io, db) => {
    io.on('connection', function (socket) {
        console.log(`${socket.id} connected`);
        socket.on('join', ({uid}) => {
            var clientInfo = new Object()
            clientInfo.uid = uid
            clientInfo.sid = socket.id
            client[uid] = clientInfo
            // socket.join(room)
            // socket.join('api')
            console.log(uid , 'join api room');
            socket.emit('join', { id: socket.id })
        })
        socket.on('leave', ({uid}) => {
            // socket.leave('api')
            console.log(uid , 'leave api room');

        })
        socket.on('disconnect', function () {
            console.log(client);
            console.log(`${socket.id} disconnected`);
        })
    })
}
