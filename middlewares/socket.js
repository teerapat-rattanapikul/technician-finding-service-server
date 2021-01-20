var clients = [];
const formModel = require("../models").forms;
module.exports = (app, io, db) => {
  io.on("connection", function (socket) {
    console.log(`${socket.id} connected`);
    socket.on("join", ({ uid }) => {
      var clientInfo = new Object();
      clientInfo.uid = uid;
      clientInfo.sid = socket.id;
      clients[uid] = clientInfo;
      console.log(clients);
      socket.join("api");
      // console.log(uid, 'join api room');
      console.log(socket.rooms);
      socket.emit("join", { id: socket.id });
      socket.emit("delete_client");
    });
    socket.on("leave", ({ uid }) => {
      console.log(uid, "leave api room");
      socket.leave("api");
      delete clients[uid];
    });

    socket.on("test", (data) => {
      console.log(data);
      socket.emit("test", data);
    });

    socket.on("delete_client", (data) => {
      // delete clients[data]
    });

    socket.on("disconnect", function () {
      console.log(clients, socket.id);
      for (var client in clients) {
        if (clients[client].sid === socket.id) {
          delete clients[client];
          break;
        }
      }
    });

    socket.on("send_message", function (data) {
      if (clients[data.receiver] !== undefined) {
        socket.to(clients[data.receiver].sid).emit("receive_message", {
          message: data.message,
          sender: data.sender,
        });
      } else {
        console.log("not available");
      }
    });

    socket.on("send_post_req", async function (data) {

      console.log('send post req' , data);
      //   await formModel.create(data);
      if (clients["5ffed875c2aad77514888d92"] !== undefined) {
        socket
          .to(clients["5ffed875c2aad77514888d92"].sid)
          .emit("send_post_req", data);
      }

    });


    socket.on('accepted_req', ({ sendTo, payload }) => {
      console.log(sendTo);
      console.log(payload);
      if(clients[sendTo] !== undefined){
        socket
          .to(clients[sendTo].sid)
          .emit("accepted_req", payload);
      }
    })

  });
};