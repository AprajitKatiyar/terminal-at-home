import express from "express";
import cors from "cors";
import http from "http";
import { IoManager } from "./managers/IoManager";
import { TerminalManager } from "./managers/TerminalManager";
import { Socket } from "socket.io";
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
const terminalManager = new TerminalManager();

io.on("connection", (socket) => {
  console.log("New Connection");
  initHandlers(socket);
});
function initHandlers(socket: Socket) {
  socket.on("disconnect", () => {
    console.log("User Disconnected!");
  });

  socket.on("requestTerminal", async () => {
    terminalManager.createPty((data) => {
      socket.emit("terminal", {
        data: Buffer.from(data, "utf-8"),
      });
    });
  });

  socket.on("terminalData", async ({ data }: { data: string }) => {
    terminalManager.write(data);
  });
}
