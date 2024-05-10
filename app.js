const path = require("path");
const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// redirects
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
