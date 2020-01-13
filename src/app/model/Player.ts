import { SetOfCards } from './SetOfCards'
import { BestHand } from './BestHand'
import { Card } from './Card'

export class Player
{
    name : String
    position : number
    playerCards : SetOfCards
    boardCards : SetOfCards
    bestHand : BestHand
    percentage : number
    active : boolean
    card1 : Card
    card2 : Card

    constructor( name : String, position : number )
    {
        this.name = name;
        this.position = position;
    }

}