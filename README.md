# Verify if socket.io ws upgrade failed or not


1. npm install
2. `pm2 app.js` or `node app.js`
3. `pm2 restart 0 && pm2 logs 0`
4. http://localhost:8080 
5. wait for ping on page

I use [Request X](https://chrome.google.com/webstore/detail/request-x/cblonkdlnemhdeefhmaoiijjaedcphbf) chrome extension to block ws connection: `/^ws://localhost:8080/`
