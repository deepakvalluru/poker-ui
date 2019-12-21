import { Card } from './Card';

export class SetOfCards
{
    cards : Array<Card>

    constructor( cards : Array<Card> )
    {
        this.cards = cards;
    }
}