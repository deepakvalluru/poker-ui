export class ActiveCardPosition
{
    isPlayer : boolean
    isBoard : boolean
    cardPosition : String
    playerName : String

    constructor( isPlayer : boolean, isBoard : boolean, cardPosition : String, playerName : String )
    {
        this.isPlayer = isPlayer;
        this.isBoard = isBoard;
        this.cardPosition = cardPosition;
        this.playerName = playerName;
    }
}