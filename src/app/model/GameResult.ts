import { Player } from './Player';
import { BestHand } from './BestHand';
import { Game } from './Game';

export class GameResult
{
    players : Array<Player>
    winners : Array<Player>
    bestHand : BestHand
    isResultAvailable : boolean
    game : Game
}