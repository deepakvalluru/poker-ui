export class Card
{
    number : String
    suit : String
    imagePath : String
    isCardDealed : boolean
    active : boolean

    constructor( number : String, suit : String, imagePath : String, isCardDealed? : boolean, active? : boolean )
    {
        this.number = number;
        this.suit = suit;
        this.imagePath = imagePath;
        this.isCardDealed = isCardDealed;
        this.active = active;
    }    
}