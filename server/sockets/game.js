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
    this.room = room
    this.deck = new Deck()
    this.players = [new Player(initialPlayer.id, initialPlayer.name)]
  }

  addPlayer(id, name) {
    this.players.push(new Player(id, name))
  }
}

module.exports = Game
