const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path'); 
const app = express();
const usersRouter = require('./routes/users');


require('dotenv').config();

// Connect to MongoDB
console.log("Connecting to MongoDB...");
mongoose.connect("mongodb://localhost:27017/demo2");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('views', './views');
app.set('view engine', 'ejs');

const port = process.env.PORT || 3069;
app.use("/", usersRouter);

app.get('/register', function(req, res){
  res.render("register");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

