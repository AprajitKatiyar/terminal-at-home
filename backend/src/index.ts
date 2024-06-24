import express from "express";
import cors from "cors";
import http from "http";
import { IoManager } from "./managers/IoManager";
const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hi !!");
});

httpServer.listen(3000, () => {
  console.log("Server is up and running!");
});

export default httpServer;

const io = IoManager.getIo();

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.on("init", (message) => {
    console.log("message recevied from client");
    socket.emit("message", message);
  });
});
