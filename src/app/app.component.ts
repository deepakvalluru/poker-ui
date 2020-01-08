import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PokerService } from './poker.service';
import { Game } from './model/Game';
import { ActiveCardPosition } from './model/ActiveCardPosition';

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
  activeCard : ActiveCardPosition

  constructor( private pokerService : PokerService )
  {
  }

  getData() : any
  {
    this.pokerService.getNewGame().subscribe( 
      data => 
      {
        this.game = data;
      } );
  }

  receiveMessage($event : ActiveCardPosition) 
  {
    this.activeCard = $event
    console.log( "Event Received in App Component: "+this.activeCard.isBoard + " - " +this.activeCard.cardPosition );
  }
}
