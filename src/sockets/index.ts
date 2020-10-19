import io from 'socket.io-client'
let socket: SocketIOClient.Socket
const { REACT_APP_SOCKET_SERVER = '' } = process.env

export const initiateSocket = (room: number) => {
  socket = io(REACT_APP_SOCKET_SERVER)
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit('join', room)
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if (socket) socket.disconnect()
}
