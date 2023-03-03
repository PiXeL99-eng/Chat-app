if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
app.use(cors())
const port = 8800 || process.env.PORT

// const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const userRoute = require("./routes/users");
// const router = express.Router();
// const path = require("path");

mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use(express.json());

// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/conversations", conversationRoute);
// app.use("/messages", messageRoute);

app.listen(8800, () => {
  console.log(`Backend server is running at ${port}!`);
});