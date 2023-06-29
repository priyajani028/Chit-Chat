- folders:  public and server
- In public 
```
npx create-react-app chat-app
```
- In server
```
npm init
```
```
npm i express mongoose nodemon socket.io dotenv bcrypt cors
```
- in package.json of server folder, modify scripts and write additional "start" line:
```
"start": "nodemon index.js"
```

- create index.js in server folder. write all the required lines 
- create .env file as well in the same folder.
- connect with the mongodb server and add port to listen.

# **Public**

- install dependencies
```
npm i axios styled-components react-router-dom react-toastify buffer react-icons emoji-picker-react socket.io-client uuid
```