import React, { useEffect, useState } from 'react'
import { initiateSocket, disconnectSocket } from 'sockets'
interface GameProps {}

const Game = (props: GameProps) => {
  const [gameState, setGameState] = useState({})

  const room = 1
  const name = 'Andrew'

  useEffect(() => {
    initiateSocket(room, name, setGameState)

    return () => {
      disconnectSocket()
    }
  }, [room, name])

  return <div>{JSON.stringify(gameState, null, 2)}</div>
}
export default Game
