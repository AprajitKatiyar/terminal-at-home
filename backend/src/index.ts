import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi !!");
});
app.listen(3000, () => {
  console.log("Server is up and running!");
});
