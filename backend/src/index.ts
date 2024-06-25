import express from "express";
import cors from "cors";
import http from "http";
import { IoManager } from "./managers/IoManager";
import { spawn } from "node-pty";
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
  const pty = spawn("powershell.exe", [], {
    name: "xterm-color",
    env: process.env,
  });
  pty.onData((data: string) => {
    socket.emit("output", data);
  });
  socket.on("message", (message: any) => {
    // if (message.type === "command") {
    pty.write(message);
    //   socket.emit("command-receive", message.data);
    // }
  });
});
