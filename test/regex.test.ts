import {expect} from 'chai';
import {OpenVPN} from "../src/openvpn";
import 'mocha';

describe('checkIP should parse the received IP', () => {
    it('should return 192.168.252.153', () => {
        const result: RegExpMatchArray = OpenVPN.checkIP("PUSH: Received control message: 'PUSH_REPLY,route 192.168.252.0 255.255.255.0,route 192.168.253.0 255.255.255.0,dhcp-option DNS 8.8.8.8,dhcp-option DNS 8.8.4.4,route-gateway 192.168.252.10,ping 10,ping-restart 120,ifconfig 192.168.252.153 255.255.255.0,peer-id 3'");
        expect(result).to.have.lengthOf(2);
        expect(result[1]).to.be.equal("192.168.252.153");
    });
});