require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const User = require("./models/User");
const Post = require("./models/Post");
const uploadMiddleware = multer({ dest: "uploads/" });
const cookieParser = require("cookie-parser");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function connection() {
  try {
    mongoose.connect(process.env.DB_CONNECTION_URL);
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Failed to connect to database" + error.message);
  }
}
connection();

function authenticateToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
}

app.post("/register", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const newPath = `uploads\\` + originalname;
  fs.renameSync(path, newPath);
  const { name, username, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      username,
      password: bcrypt.hashSync(password, salt),
      cover: newPath,
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) res.status(400).json("no such user");
  else {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({ username, id: userDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  }
});

app.post("/profile", authenticateToken, async (req, res) => {
  const username = req.body.username;
  const userDoc = await User.findOne({ username });
  if (!userDoc) res.status(400).json("no such user");
  else {
    console.log(userDoc);
    const name = userDoc.name;
    const username = userDoc.username;
    const cover = userDoc.cover;
    res.json({ name, username, cover });
  }
});

app.post("/post", authenticateToken, uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  console.log(originalname + " " + path);
  const newName = `uploads\\` + originalname;
  fs.renameSync(path, newName);
  const { username, caption } = req.body;
  console.log(req.body);

  try {
    const postDoc = await Post.create({
      username: username,
      caption: caption,
      cover: newName,
    });
    post_id = postDoc._id;
    console.log("Post created: ", postDoc, post_id);
    res.json(postDoc);
  } catch (err) {
    console.log("Error while creating Post: " + err);
    res.status(400).json(err);
  }
});

app.post("/your-posts", authenticateToken, async (req, res) => {
  const { username } = req.body;
  try {
    const postDocs = await Post.find({
      username: username,
    });
    console.log("postDocs: ", postDocs);
    res.json(postDocs);
  } catch (err) {
    console.log("Error while fetching your posts: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
