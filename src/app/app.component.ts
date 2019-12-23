import { Component, OnInit } from '@angular/core';
import { PokerService } from './poker.service';
import { Game } from './model/Game';

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

  
}
