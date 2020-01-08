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
  private flop1 : Card
  private flop2 : Card
  private flop3 : Card
  private turn : Card
  private river : Card
  activeCardPosition : ActiveCardPosition

  @Output() 
  messageEvent : EventEmitter<ActiveCardPosition> = new EventEmitter();

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

      this.flop1 = boardCards[0] ? boardCards[0] : new Card(undefined, undefined, undefined, undefined, false);
      this.flop2 = boardCards[1] ? boardCards[1] : new Card(undefined, undefined, undefined, undefined, false);
      this.flop3 = boardCards[2] ? boardCards[2] : new Card(undefined, undefined, undefined, undefined, false);
      this.turn  = boardCards[3] ? boardCards[3] : new Card(undefined, undefined, undefined, undefined, false);
      this.river = boardCards[4] ? boardCards[4] : new Card(undefined, undefined, undefined, undefined, false);

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
      this.messageEvent.emit( new ActiveCardPosition( false, true, cardPosition, null ) );
    }
    console.log( "back to deck" + card );
  }

  getImage( card : Card )
  {
    if( card == undefined || card.suit == undefined )
    {
      return "http://localhost:8080/api/pokergame" + "/images/gray_back.png";
    }
  }

  ngOnInit() {
  }

}
