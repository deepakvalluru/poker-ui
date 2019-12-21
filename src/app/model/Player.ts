import { SetOfCards } from './SetOfCards'
import { BestHand } from './BestHand'

export class Player
{
    name : String
    position : number
    playerCards : SetOfCards
    boardCards : SetOfCards
    bestHand : BestHand
    percentage : number
    active : boolean

    constructor( name : String, position : number )
    {
        this.name = name;
        this.position = position;
    }

}