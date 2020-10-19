require('dotenv').config()
const express = require('express')
const { SOCKET_PORT } = process.env
const app = express()
const socket = require('socket.io')
const { Game, Self } = require('./game')

const server = app.listen(SOCKET_PORT, () =>
  console.log(`Sockets good: ${SOCKET_PORT}`)
)

const games = {}

const io = socket(server)

io.on('connection', (socket) => {
  console.log('Connection')

  socket.on('join', ({ room, name }) => {
    socket.self = new Self(socket.id, name)
    if (games[room]) {
      games[room].addPlayer(socket.id, name)
    } else {
      games[room] = new Game(room, { id: socket.id, name })
    }
    console.log(`Joined room ${room}`)
    socket.join(room)
    io.in(room).emit('game state', {
      gameState: games[room].public,
      self: socket.self,
    })
  })
})
