const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

require("dotenv/config");
const port = process.env.PORT;
const db = process.env.DATA_BASE;
mongoose.connect(
  `${db}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  function (err) {
    if (err) {
      console.log("connect database error\n", err);
    } else {
      console.log("connect database success");
    }
  }
);

app.use("/uploads/", express.static("uploads"));
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "application/graphql" }));
app.use("/api", apiRoutes);

require("./middlewares/socket")(app, io, db);

server.listen(port);
