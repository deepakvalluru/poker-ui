import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PokerService } from './poker.service';
import { Game } from './model/Game';
import { ActiveCardPosition } from './model/ActiveCardPosition';
import { Card } from './model/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void 
  {
    this.getData();
  }

  title = 'poker-ui';
  game : Game
  activeCard : ActiveCardPosition = new ActiveCardPosition( false, true, "flop1", null );
  dealtCard : Card

  constructor( private pokerService : PokerService )
  {
  }

  getData() : any
  {
    this.pokerService.getNewGame().subscribe( 
      data => 
      {
        this.game = data;
        for (let i = 0; i < this.game.deck.cards.length; i++) {
          this.game.deck.cards[i].imagePath =
            "http://localhost:8080/api/pokergame" + this.game.deck.cards[i].imagePath;
        }
      } );
  }

  receiveActivePositionEvent($event : ActiveCardPosition) 
  {
    this.activeCard = $event
    if( this.activeCard != undefined )
    {
      console.log( "ActiveCardPosition Event Received in App Component: "+this.activeCard.isBoard + " - " + this.activeCard.cardPosition );
    }
  }

  receiveGameEvent( $event : Game )
  {
    this.game = $event;
    console.log( "Game Event Received in App Component. " );
  }

  receiveDealtCardEvent($event : Card )
  {
    this.dealtCard = $event;
    if( this.dealtCard != undefined )
    {
      console.log( "Dealt Card Event Received in App Component : "  +  this.dealtCard.number + " - " + this.dealtCard.suit );
    }
  }
}
