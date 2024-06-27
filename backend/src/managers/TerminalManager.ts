import { spawn, IPty } from "node-pty";

const SHELL = "powershell.exe";

export class TerminalManager {
  private terminal!: IPty;

  createPty(onData: (data: string) => void) {
    let term = spawn(SHELL, [], {
      cols: 100,
      name: "xterm",
    });
    term.onData((data: string) => {
      onData(data);
    });
    this.terminal = term;
  }

  write(data: string) {
    this.terminal.write(data);
  }
  clear() {
    this.terminal.kill();
  }
}
