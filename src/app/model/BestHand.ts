import { SetOfCards } from './SetOfCards'

export class BestHand
{
    hand : String
    setOfCards : SetOfCards

    constructor( hand : String, setOfCards : SetOfCards )
    {
        this.hand = hand;
        this.setOfCards = setOfCards;
    }
}