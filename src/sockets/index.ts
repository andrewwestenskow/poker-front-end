import io from 'socket.io-client'
import { Game } from 'types'
let socket: SocketIOClient.Socket
const { REACT_APP_SOCKET_SERVER = '' } = process.env

export const initiateSocket = (
  room: number,
  name: string,
  setFn: (gameState: Game) => void
) => {
  socket = io(REACT_APP_SOCKET_SERVER)
  console.log(`Connecting socket...`)
  if (socket && room) socket.emit('join', { room, name })

  socket.on('game state', (data: Game) => setFn(data))
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...')
  if (socket) socket.disconnect()
}
