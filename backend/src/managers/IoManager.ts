import httpServer from "..";
import { Server } from "socket.io";

export class IoManager {
  private static io: Server;
  public static getIo() {
    if (!this.io) {
      this.io = new Server(httpServer, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
    }
    return this.io;
  }
}
