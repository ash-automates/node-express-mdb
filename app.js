const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

const blogs = [
  {
    title: "Yoshi finds eggs",
    snippet: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    title: "Mario finds stars",
    snippet: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    title: "How to defeat bowser",
    snippet: "Lorem ipsum dolor sit amet consectetur",
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
