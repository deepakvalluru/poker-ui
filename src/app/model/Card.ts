export class Card
{
    number : String
    suit : String
    imagePath : String
    
    constructor( number : String, suit : String, imagePath : String )
    {
        this.number = number;
        this.suit = suit;
        this.imagePath = imagePath;
    }    
}