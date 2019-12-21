import { Card } from './Card';

export class Deck
{
    cards : Array<Card>

    constructor( cards : Array<Card> )
    {
        this.cards = cards;
    }
}