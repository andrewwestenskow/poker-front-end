require('dotenv').config()
const express = require('express')
const { SOCKET_PORT } = process.env
const app = express()
const socket = require('socket.io')

const server = app.listen(SOCKET_PORT, () =>
  console.log(`Sockets good: ${SOCKET_PORT}`)
)

const io = socket(server)

io.on('connection', (socket) => {
  console.log('Connection')
})
