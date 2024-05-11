const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();
const port = 3500;

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

// Generic routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Blogs", blogs: result });
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
