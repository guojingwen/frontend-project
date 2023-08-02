'use strict';
const os = require('os');
function getIPV6Address() {
	const interfaces = os.networkInterfaces();
	for (const devName in interfaces) {
			//
			const iface = interfaces[devName];
			for (let i = 0; i < iface.length; i++) {
					let alias = iface[i];
					//console.log(alias)
					if (alias.family === 'IPv6' && alias.address !== '::1' && !alias.internal) {
							return alias.address;
					}
			}
	}
	return null;
}

console.log(getIPV6Address());
// 240e:390:e6d:4df1:8f4:581b:6202:2

"Binds": [
	"/home/gjw/myDockerFiles/nginx/conf/:/etc/nginx/"
],


"Binds": [
	"/home/ubuntu/myDockerFiles/nginx/html/:/usr/share/nginx/html/",
	"/home/ubuntu/myDockerFiles/nginx/conf/nginx/:/etc/nginx/",
	"/home/ubuntu/myDockerFiles/nginx/logs/nginx/:/var/log/nginx/"
],