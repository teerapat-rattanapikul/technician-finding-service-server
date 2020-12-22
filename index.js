const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");
const mongoose = require("mongoose");
const server = require('http').createServer(app)
const io = require('socket.io')(server)

require("dotenv/config");
const port = process.env.PORT;
const db = process.env.DATA_BASE;
mongoose.connect(`${db}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

io.of('api').on('connection' , function (socket){
  console.log(`${socket.id} connected`);
  socket.on('disconnect' , function (){
    console.log(`${socket.id} disconnected`);
  })
})

app.use("/uploads/", express.static("uploads"));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "application/graphql" }));
app.use("/api", apiRoutes);

server.listen(port);
