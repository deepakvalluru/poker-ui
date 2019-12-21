import { Deck } from './Deck';
import { Player } from './Player';
import { SetOfCards } from './SetOfCards';

export class Game
{
    players : Array<Player>
    boardCards : SetOfCards
    deck : Deck

    constructor( players : Array<Player> , boardCards : SetOfCards, deck : Deck ) 
    {
        this.players = players;
        this.boardCards = boardCards;
        this.deck = deck;
	}
    
}