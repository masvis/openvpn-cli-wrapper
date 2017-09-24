"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var events_1 = require("events");
var util_1 = require("util");
var OpenVPN = /** @class */ (function () {
    function OpenVPN(vpnOpts, executablePath) {
        this.vpnOpts = vpnOpts;
        this.executablePath = executablePath;
        this.events = new events_1.EventEmitter();
        this.vpnAddress = null;
        this.process = null;
    }
    OpenVPN.prototype.getExecutablePath = function () {
        return this.executablePath ? this.executablePath : 'openvpn';
    };
    OpenVPN.checkIP = function (data) {
        return data.match(/(?:ifconfig\ ([0-9.]+)\ [0-9.]+)/);
    };
    OpenVPN.prototype.connect = function () {
        var _this = this;
        this.process = child_process_1.spawn(this.getExecutablePath(), this.vpnOpts);
        this.process.stdout.on("data", function (data) {
            var output = data.toString();
            var results = OpenVPN.checkIP(output);
            if (results && results.length > 2)
                _this.vpnAddress = results[1];
            _this.events.emit("data", output);
            if (output.match('Initialization Sequence Completed'))
                _this.events.emit('connected');
        });
        this.process.stdout.on("close", function () { return _this.events.emit("disconnected"); });
    };
    OpenVPN.prototype.disconnect = function () {
        if (!util_1.isNullOrUndefined(this.process))
            this.process.kill();
    };
    return OpenVPN;
}());
exports.OpenVPN = OpenVPN;
