interface Card {
  suite: string
  value: string | number
}

interface Player {
  id: string
  name: string
  hand: Array<Card>
}

export interface Game {
  room: number
  deck: Array<Card>
  players: Array<Player>
}
