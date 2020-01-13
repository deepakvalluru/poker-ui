import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../model/Card';
import { Game } from '../model/Game';
import { Player } from '../model/Player';
import { ActiveCardPosition } from '../model/ActiveCardPosition';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor() { }

  private _game : Game
  private players : Array<Player>
  private _activeCard : ActiveCardPosition
  private _dealtCard : Card

  ngOnInit() {
  }

  @Input()
  set game(game: Game) {
    this._game = game;
    console.log("received input for game in players Component");
    this.players = game.players;
  }

  @Input()
  set dealtCard( dealtCard : Card )
  {
    this._dealtCard = dealtCard;
  }  

  @Output() 
  activePositionEvent : EventEmitter<ActiveCardPosition> = new EventEmitter();

  getPlayerCard( playerName : String, cardPosition : String ) : Card
  {
    let playerCard : Card = new Card(undefined, undefined, undefined, undefined, false);
    if( this.players != undefined && this.players.length > 0 )
    {
      for( let player of this.players ) 
      {
        if( player.name === playerName )
        {
          if( cardPosition === "card1" && player.playerCards.cards.length > 0 )
          {
            return player.playerCards.cards[0];
          } 
          else if( cardPosition === "card2" && player.playerCards.cards.length > 1)
          {
            return player.playerCards.cards[1];
          }
        }
      }
    }
    
    return playerCard;
  }

  selectPlayerCard( playerName : String, cardPosition : String )
  {
    if( playerName != undefined && cardPosition != undefined )
    {
      this._activeCard = new ActiveCardPosition( true, false, cardPosition, playerName );
      this.activePositionEvent.emit( this._activeCard );
    }
    else
    {

    }
  }

  getImage( playerName : String, cardPosition : String ) : String
  {
    let playerCard = this.getPlayerCard( playerName, cardPosition );
    if( playerCard != undefined && playerCard.number != undefined )
    {
      return playerCard.imagePath;
    }
    else
    {
      return "http://localhost:8080/api/pokergame" + "/images/gray_back.png";
    }
  }

  @Input()
  set activeCard(activeCard: ActiveCardPosition)
  {
    this._activeCard = activeCard;
  }

  get activeCard() : ActiveCardPosition
  {
    return this._activeCard;
  }

  // getActive()
  // {
  //   this.activeCard != undefined && this.activeCard.playerName==='player2' && this.activeCard.cardPosition==='card2';
  // }

}
