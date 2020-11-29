const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app)
const port = process.env.PORT || 8888
const socketio = require('socket.io')

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket => {
  console.log(socket.id)

  socket.emit('message', 'welcome ' + socket.id)
  socket.broadcast.emit('message', socket.id + ' has connected')

  socket.on('disconnect', socket => {
    io.emit('message', socket.id + ' has disconnected')
    console.log(socket.id + ' disconnected...');
  });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})