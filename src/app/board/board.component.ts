import { Component, OnInit, Input, Output } from '@angular/core';
import { SetOfCards } from '../model/SetOfCards';
import { Card } from '../model/Card';
import { ActiveCardPosition } from '../model/ActiveCardPosition';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  private _board : SetOfCards
  private flop1 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private flop2 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private flop3 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private turn : Card = new Card(undefined, undefined, undefined, undefined, false);
  private river : Card = new Card(undefined, undefined, undefined, undefined, false);
  private _activeCard : ActiveCardPosition
  private _dealtCard : Card

  @Output() 
  activePositionEvent : EventEmitter<ActiveCardPosition> = new EventEmitter();

  @Input()
  set board( boardCards : SetOfCards )
  {
    if( boardCards != null && boardCards != undefined )
    {
      this._board = boardCards;
      for( let i=0; i< this._board.cards.length; i++)
      {
        this._board.cards[i].imagePath = "http://localhost:8080/api/pokergame" + this._board.cards[i].imagePath;
      }  

    }
    
  }

  @Input()
  set activeCard(activeCard: ActiveCardPosition)
  {
    this._activeCard = activeCard;
    if( this._activeCard != undefined && this._activeCard.isBoard == true )
    {

    }
  }

  @Input()
  set dealtCard( dealtCard : Card )
  {
    this._dealtCard = dealtCard;
    if( this._activeCard != undefined && this._activeCard.isBoard )
    {
      let cardPosition : String = this._activeCard.cardPosition;

      switch( cardPosition )
      {
        case "flop1":
          this.flop1 = dealtCard;
          break;
        
        case "flop2":
          this.flop2 = dealtCard;
          break;  

        case "flop3":
          this.flop3 = dealtCard;
          break;

        case "turn":
        this.turn = dealtCard;
        break;

        case "river":
        this.river = dealtCard;
        break;
      }

    }
  }

  get board() : SetOfCards
  {
    return this._board;
  }

  selectBoardCard( card : Card, cardPosition : String )
  {
    if( card == undefined || card.suit == undefined  )
    {
      this.flop1.active = false;
      this.flop2.active = false;
      this.flop3.active = false;
      this.turn.active  = false;
      this.river.active = false;
      card.active = true;
      this.activePositionEvent.emit( new ActiveCardPosition( false, true, cardPosition, null ) );
    }
    console.log( "back to deck" + card );
  }

  getImage( card : Card )
  {
    if( card == undefined || card.suit == undefined )
    {
      return "http://localhost:8080/api/pokergame" + "/images/gray_back.png";
    }
    else
    {
      return card.imagePath;
    }
  }

  ngOnInit() {
  }

  compareCards = ( obj1 : Card, obj2 : Card ) => obj1.number === obj2.number && obj1.suit === obj2.suit;

}
