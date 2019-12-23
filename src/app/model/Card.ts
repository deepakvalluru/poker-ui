export class Card
{
    number : String
    suit : String
    imagePath : String
    isCardDealed : boolean
    position : number
    
    constructor( number : String, suit : String, imagePath : String )
    {
        this.number = number;
        this.suit = suit;
        this.imagePath = imagePath;
    }    
}