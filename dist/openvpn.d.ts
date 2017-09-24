/// <reference types="node" />
import { EventEmitter } from "events";
export declare class OpenVPN {
    private vpnOpts;
    private executablePath;
    events: EventEmitter;
    private vpnAddress;
    private process;
    constructor(vpnOpts: string[], executablePath?: string);
    private getExecutablePath();
    static checkIP(data: string): RegExpMatchArray;
    connect(): void;
    disconnect(): void;
}
