import { Component, OnInit, Input, Output } from '@angular/core';
import { SetOfCards } from '../model/SetOfCards';
import { Card } from '../model/Card';
import { ActiveCardPosition } from '../model/ActiveCardPosition';
import { EventEmitter } from '@angular/core';
import { Game } from '../model/Game';
import { Player } from '../model/Player';
import { CardDeal } from '../model/CardDeal';
import { PokerService } from '../poker.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor( private pokerService: PokerService ) { }

  private _game : Game
  private flop1 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private flop2 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private flop3 : Card = new Card(undefined, undefined, undefined, undefined, false);
  private turn : Card = new Card(undefined, undefined, undefined, undefined, false);
  private river : Card = new Card(undefined, undefined, undefined, undefined, false);
  private _activeCard : ActiveCardPosition
  private _dealtCard : Card

  @Output() 
  activePositionEvent : EventEmitter<ActiveCardPosition> = new EventEmitter();

  @Output()
  gameEvent: EventEmitter<Game> = new EventEmitter();

  @Input()
  set game(game: Game) {
    this._game = game;
    console.log("received input for game in Deck Component");
  }

  @Input()
  set activeCard(activeCard: ActiveCardPosition)
  {
    this._activeCard = activeCard;
    if( this._activeCard != undefined && this._activeCard.isBoard == true )
    {
      let cardPosition : String = this._activeCard.cardPosition;

      switch( cardPosition )
      {
        case "flop1":
          this.flop1.active = true;
          break;
        
        case "flop2":
          this.flop2.active = true;
          break;  

        case "flop3":
          this.flop3.active = true;
          break;

        case "turn":
        this.turn.active = true;
        break;

        case "river":
        this.river.active = true;
        break;
      }

    }
  }

  @Input()
  set dealtCard( dealtCard : Card )
  {
    this._dealtCard = dealtCard;
    if( this._dealtCard != undefined && this._activeCard != undefined && this._activeCard.isBoard )
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

      this.activePositionEvent.emit( null );

    }
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
    else
    {
      console.log( "back to deck" + card.number + "-" + card.suit );
      let cardDeal : CardDeal = new CardDeal(
        this._game,
        card,
        this._activeCard != undefined ? this._activeCard.isPlayer : false,
        this._activeCard != undefined ? this._activeCard.isBoard : false,
        new Player(this._activeCard != undefined ? this._activeCard.playerName : null, null)
      );

      this.pokerService.dealCardBackToDeck(cardDeal).subscribe(
        data => {
          this._game = data.game;
          this.gameEvent.emit(this._game);

          // disable all active
          this.flop1.active = false;
          this.flop2.active = false;
          this.flop3.active = false;
          this.turn.active  = false;
          this.river.active = false;

          //enable only one active
          switch( cardPosition )
          {
            case "flop1":
              this.flop1 = new Card(undefined, undefined, undefined, undefined, true);;
              break;
          
            case "flop2":
              this.flop2 = new Card(undefined, undefined, undefined, undefined, true);;
              break;  

            case "flop3":
              this.flop3 = new Card(undefined, undefined, undefined, undefined, true);;
              break;

            case "turn":
              this.turn = new Card(undefined, undefined, undefined, undefined, true);;
              break;

            case "river":
              this.river = new Card(undefined, undefined, undefined, undefined, true);;
              break;
          }
          this._activeCard = new ActiveCardPosition( false, true, cardPosition, null ) ;
          this.activePositionEvent.emit( this._activeCard );
        }
    );  


    }
    
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
