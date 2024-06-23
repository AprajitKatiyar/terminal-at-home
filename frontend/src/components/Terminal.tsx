import { Terminal } from "@xterm/xterm";
import React, { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

const term = new Terminal();

const XTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!terminalRef || !terminalRef.current) return;
    term.open(terminalRef.current);
    term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
  }, [terminalRef]);

  return <div ref={terminalRef} />;
};
export default XTerminal;
