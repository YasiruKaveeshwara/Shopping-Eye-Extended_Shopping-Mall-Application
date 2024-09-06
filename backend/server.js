const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3050; //Do not change port if you want to change please let other know

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection success!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// this is only sample code
/*
const travelAgencyRouter = require("./routes/travelAgency"); // import every models
app.use("/travelAgencyList", travelAgencyRouter); // url for page
*/
