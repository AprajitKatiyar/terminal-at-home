import { Terminal } from "xterm";
import React, { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { FitAddon } from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
const fitAddOn = new FitAddon();
const OPTIONS_TERM = {
  useStyle: true,
  screenKeys: true,
  cursorBlink: true,
  cols: 200,
  theme: {
    background: "black",
  },
};
function ab2str(buf: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buf);
  const charArray = Array.from(uint8Array);
  return String.fromCharCode(...charArray);
}

const XTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (!terminalRef || !terminalRef.current || !socket) return;

    socket.emit("requestTerminal");
    socket.on("terminal", terminalHandler);
    const term = new Terminal(OPTIONS_TERM);
    term.loadAddon(fitAddOn);
    term.open(terminalRef.current);
    fitAddOn.fit();
    function terminalHandler({ data }: { data: ArrayBuffer }) {
      if (data instanceof ArrayBuffer) {
        console.error(data);
        console.log(ab2str(data));
        term.write(ab2str(data));
      }
    }
    term.onData((data) => {
      console.log(data);
      socket.emit("terminalData", {
        data,
      });
    });

    socket.emit("terminalData", {
      data: "\n",
    });

    return () => {
      socket.off("terminal");
    };
  }, [terminalRef, socket]);

  return <div ref={terminalRef} />;
};
export default XTerminal;
