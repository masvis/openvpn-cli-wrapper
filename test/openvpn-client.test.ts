import {OpenVPN} from "../src/openvpn";

import {expect} from 'chai';
import * as assert from "assert";
import 'mocha';

import * as fs from "fs";
import * as path from "path";

import * as optimist from "optimist";
import * as nconf from "nconf";


export function importVariables(context: string) {
    const configFilePath = optimist.demand('config').argv.config;
    assert.ok(fs.existsSync(configFilePath), 'config.json file not found at path: ' + configFilePath);

    const config = nconf.env().argv().file({file: configFilePath});
    return config.get(context);
}

describe('OpenVPN should connect correctly', () => {
    it('without timouting', (done: MochaDone) => {
        const config = importVariables("openVPNConfigurations");
        assert.ok(
            fs.existsSync(config.folder),
            'vpn configuration folder not found at path: ' + config.folder
        );
        assert.ok(
            fs.existsSync(config.folder),
            'vpn configuration file not found at path: ' + path.join(config.folder, config.fileName)
        );

        let disconnection: boolean = false;
        let openVPNClient: OpenVPN = new OpenVPN([
            "--client",
            "--cd", config.folder,
            "--config", config.fileName
        ]);
        openVPNClient.events.on("data", (data) => console.log("New data received:" + data));
        openVPNClient.events.on("connected", () => {
            disconnection = true;
            openVPNClient.disconnect()
        });
        openVPNClient.events.on("disconnected", () => {
            if (disconnection)
                done();
            else
                done(new Error("Closed before time"));
        });
        console.log("Connecting.");
        openVPNClient.connect();
    }).timeout(60000);
});