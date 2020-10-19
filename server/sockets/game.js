const cards = require('../constants/cards')
const shuffle = require('knuth-shuffle').knuthShuffle

class Deck {
  constructor() {
    this.availableCards = [...cards]
    this.discardedCards = []
  }

  shuffle() {
    this.discardedCards = []
    this.availableCards = shuffle([...cards])
  }

  drawCard() {
    const [card] = this.availableCards.splice(0, 1)
    return card
  }

  discardCard(card) {
    this.discardedCards.push(card)
  }
}

class Player {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

class Self extends Player {
  constructor(id, name) {
    super(id, name)
    this.hand = []
  }

  drawCard(deck) {
    this.hand.push(deck.drawCard())
  }

  discardCard(card, deck) {
    const index = this.hand.findIndex(
      (e) => e.suite === card.suite && e.value === card.value
    )

    if (index === -1) {
      return
    }

    this.hand.splice(index, 1)

    deck.discardCard(card)
  }
}

class Game {
  constructor(room, initialPlayer) {
    const deck = new Deck()
    deck.shuffle()
    this.room = room
    this.deck = deck
    const player = new Player(initialPlayer.id, initialPlayer.name)
    this.public = {
      players: [player],
    }
  }

  addPlayer(id, name) {
    this.public.players.push(new Player(id, name))
  }
}

module.exports = { Game, Self }
