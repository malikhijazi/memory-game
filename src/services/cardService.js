export function initializeDeck() {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  const suits = ['diamonds', 'hearts', 'clubs', 'spades'];

  // Get possible pairs of rank and suit
  const deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit: suit, rank: rank, flipped: false });
    });
  });

  // Shuffle
  for (let i = 0; i < deck.length; i++) {
    const random = Math.floor(Math.random() * Math.floor(52));
    const temp = deck[random];
    deck[random] = deck[i];
    deck[i] = temp;
  }
  return deck;
}

function sameSuit(suit1, suit2) {
  return suit1 === suit2 ||
  (suit1 === 'spades' && suit2 === 'clubs') ||
  (suit1 === 'clubs' && suit2 === 'spades') ||
  (suit1 === 'diamonds' && suit2 === 'hearts') ||
  (suit1 === 'hearts' && suit2 === 'diamonds')
}

export function isMatch(card1, card2) {
  return card1.rank === card2.rank && sameSuit(card1.suit, card2.suit);
}