import {ChildProcess, spawn} from "child_process";
import {EventEmitter} from "events";
import {isNullOrUndefined} from "util";

export class OpenVPN {
    public events: EventEmitter = new EventEmitter();
    private vpnAddress: string = null;
    private process: ChildProcess = null;

    constructor(private vpnOpts: string[], private executablePath?: string) {
    }

    private getExecutablePath(): string {
        return this.executablePath ? this.executablePath : 'openvpn';
    }

    static checkIP(data: string): RegExpMatchArray {
        return data.match(/(?:ifconfig\ ([0-9.]+)\ [0-9.]+)/);
    }

    connect() {
        this.process = spawn(this.getExecutablePath(), this.vpnOpts);
        this.process.stdout.on("data", (data: any[]) => {
            let output: string = data.toString();

            let results: RegExpMatchArray = OpenVPN.checkIP(output);
            if (results && results.length > 2)
                this.vpnAddress = results[1];

            this.events.emit("data", output);
            if (output.match('Initialization Sequence Completed'))
                this.events.emit('connected');
        });
        this.process.stdout.on("close", () => this.events.emit("disconnected"));
    }

    disconnect() {
        if (!isNullOrUndefined(this.process))
            this.process.kill();
    }
}