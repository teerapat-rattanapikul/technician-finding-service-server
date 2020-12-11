const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require("./routes/api");
const mongoose = require("mongoose");
require("dotenv/config");
const port = process.env.PORT;
const db = process.env.DATA_BASE;
mongoose.connect(`${db}`, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.text({ type: "application/graphql" }));
app.use("/api", apiRoutes);

app.listen(port);
