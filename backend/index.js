const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const registerRouter = require("./routes/auth");
const userRouter = require("./routes/user");


const app = express();

// Mongoose Connection
try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  throw error;
}
//

//  Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));

app.use("/api", registerRouter);
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port 5000");
});
