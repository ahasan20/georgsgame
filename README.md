# **Georg’s Game**: Circuit Showdown!
https://georgsgame.herokuapp.com/

https://www.youtube.com/watch?v=j-POICzce88

## Overview
**Georg’s Game: Circuit Showdown!** is a player versus player digital turn-based card game. Gameplay consists of one-on-one matches in a best-of-three round system. At the center of each players’ screen is the game board; a circuit rendering initially consisting of two quantum channels (qtop and qbot) and two classical channels. Players can view their gate cards and drag them from the deck onto the circuit. At the end of the game, the quantum channels are measured, determining which player wins. The player who goes first wins if the two-qubit measurement is a constant output (10 or 01), while the player wins if it is a balanced output (00 or 11). The goal of the game is to add gates to manipulate the channels in the most probabilistically favorable way. This project offers a fun way to learn about and gain intuition on the different types of quantum gates and quantum puzzles. It also demonstrates the use of Qiskit in the backend for web applications and games.

## Layout
At the center of each players’ screen is the game board; a circuit rendering initially consisting of two quantum channels (qtop and qbot) and two classical channels. Players can view cards and drag them from the deck onto the circuit. Turn counter and timer are located in the top right corner, and optional statevector visualizer and measurement probabilities are displayed in the bottom right and top left corners. These features can be disabled in “Expert Mode” for players who wish to mentally track gamestate.

## Cards
### Gate Cards
There are two unique classes of cards that a player may be dealt: gate cards, and strategy cards. Gate cards will consist of either single qubit gates or two qubit gates, and each gate is assigned a rarity that determines how frequently it is drawn. The gate cards are as follows:

1. Measurement (ends the game early) (Legendary)
2. U3 (Epic)
3. SWAP (Rare)
4. CX, CY, CZ, CH (Rare)
5. RX, RY, RZ (Rare)
6. I, S, T (Uncommon)
7. S_dg, T_dg (Uncommon)
8. H (Common)
9. X, Y, Z (Common)

#### Shiny Cards
Additionally, each non-measurement gate card has a rare likelihood of being “shiny.” Regular single qubit gate cards can only be placed on the player’s active channel. On the other hand, shiny single qubit gate cards have the option of being placed on the opponent’s active channel as well. For regular controlled-gate cards, the control qubit is always qtop and the target is always qbot; for shiny controlled-gates, however the player is given the choice to switch the control and target qubits.

### Strategy Cards
Strategy cards are not gates but cards that can be played in different ways. They range from simple archetypal cards such as redrawing a card, to game-impacting cards such as resetting the qubits. The strategy cards are as follows:

1. Reset channels (Legendary)
2. Swap win condition (Epic)
3. Swap active channels (Epic)
4. Play 2 cards (Epic)
5. Dagger gate on opponent (Rare)
6. Draw fresh hand of cards (Uncommon)
7. Discard one card and draw new one (Common)
8. Swap card with opponent (Common)
     
     a. Choose one of your own card to send to opponent
     
     b. Choose a random card of your opponent

## Game Loop
At the start of each round, players are dealt a hand of cards consisting of 5 gate cards and 3 strat cards that only they may view. The “player of choice” is then randomly chosen and given the option to either (a) choose the first player or (b) assign the win conditions (this will be explained later). Whichever option the player of choice chooses, the other player gets to decide the other. For example, if the player of choice decides to be the first player, the other player gets to decide the win conditions. At the beginning of the round, the first player controls the top channel and the second player controls the bottom channel. This can be swapped later if the “Swap active channels” card is played. The players then take turns each playing one of their cards. At the end of the round, measurements are taken of the quantum circuit. Then, the win conditions determined at the start of the round determines who wins the round. The “constant” player wins if the measurement turns out to be 00 or 11, and the “balanced” player wins if the measurement turns out to be 01 or 10. Note that the win conditions for each player can be swapped if the “Swap win condition” card is played.

## Applications
* Educational
    * Demystification of the possibilities of a “quantum-computer”
    * Gaining a better visual intuition of how quantum gates act on state vectors.
* Popularization
    * Setting foundation for possible quantum computing games.
    * For Example, the idea of semi “randomness” can be applied to procedural generation or other pseudo-random processes in games
* Case study of quantum puzzles
* Demonstration of the use of Qiskit in backend for web applications

