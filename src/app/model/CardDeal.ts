import { Game } from './Game';
import { Card } from './Card';
import { Player } from './Player';

export class CardDeal
{
    game : Game
    dealtCard : Card
    playerCard : boolean
    boardCard : boolean
    player : Player

    constructor( game : Game, dealtCard : Card, playerCard : boolean, boardCard : boolean, player : Player )
    {
        this.game = game;
        this.dealtCard = dealtCard;
        this.playerCard = playerCard;
        this.boardCard = boardCard;
        this.player = player;
    }
}