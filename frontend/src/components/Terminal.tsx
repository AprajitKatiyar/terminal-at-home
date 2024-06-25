import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal();

const XTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any | null>(null);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    // socket.emit("joinProject", project.projectId);
  }, []);

  useEffect(() => {
    if (!terminalRef || !terminalRef.current) return;
    term.open(terminalRef.current);
    term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    term.onKey((e) => {
      socket.emit("message", e.key);
      console.log(e.key);
    });
  }, [terminalRef]);
  useEffect(() => {
    if (socket == null) return;
    const handleOutput = (data: string) => {
      term.write(data);
    };

    socket && socket?.on("output", handleOutput);

    return () => {
      socket && socket.off("output", handleOutput);
    };
  }, [socket]);

  return <div ref={terminalRef} />;
};
export default XTerminal;
