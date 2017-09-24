OpenVPN CLI Wrapper
===================

A Javascript/Typescript wrapper to manage VPN connections using OpenVPN command-line instructions.

This minimal implementation library is used in a production software to open a VPN connection using Electron.

Thanks to [resin.io openvpn-client project](https://github.com/resin-io/openvpn-client) for the original coffeescript
implementation.

-------------------

Installation
------------
The [OpenVPN community binaries](https://openvpn.net/index.php/open-source/downloads.html) have to be pre-installed and 
put in the PATH environment folder under Windows.

Install via npm.
```
$ npm install openvpn-cli-wrapper
```
or

Install via git clone
```
$ git clone https://github.com/masvis/openvpn-cli-wrapper
$ cd openvpn-cli-wrapper
$ npm install
```

Documentation
-------
Under `test/openvpn-client.test.ts` you can read a default implementation of a connection and disconnection test. 

[Class: OpenVPN](#openvpn)
* [Method: Constructor(vpnOpts, [executablePath]='openvpn')](#openvpn_constructor)
* [Method: .connect()](#openvpn_connect)
* [Method: .disconnect()](#openvpn_disconnect)
* [Events](#openvpn_events)

<a name="openvpn"></a>
### Class: OpenVPN
This class is the core of the library.

<a name="openvpn_constructor"></a>
#### Method: Constructor(vpnOpts, [executablePath]='openvpn')
The constructor needs to be used sending 
* **vpnOpts**: an array of CLI options.
* **executablePath** _(optional, default is **'openvpn'**)_: the path of the OpenVPN executable. This could be used to 
avoid to change the PATH env variable under Windows or to use different versions of the executable.

<a name="openvpn_connect"></a>
#### Method: .connect()
Launch the OpenVPN process
> **Note:** If your configuration need a superuser operation in Linux (ex.: creating a TAP device), you need to run
the test or your parent application using `sudo`.

<a name="openvpn_disconnect"></a>
#### Method: .disconnect()
Close the OpenVPN process
> **Note:** Under a Linux environment you need to shutdown the process calling the disconnect before quitting you 
application.

<a name="openvpn_events"></a>
#### Events
Events are emitted by the `events` field of an `OpenVPN` class instance.
* **connected**: this event is emitted after `connect` method is called, only if connection is established without 
errors.
* **disconnected**: this event is emitted after `connect` method is called if an error occurs or after `connected` 
event if a disconnection or an error occurs.
* **data**: the process is writing a new line of info data. This event will emit the data as parameter.

Test
----

Using
```
$ npm test
```
you can check that all the dependencies are correctly installed.


LICENSE
-------

MIT license. See the LICENSE file for details.