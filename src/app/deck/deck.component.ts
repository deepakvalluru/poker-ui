import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../model/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  spadesPosition : Array<Number> = [0,1,2,3,4,5,6,7,8,9,10,11,12];
  heartsPosition : Array<Number> = [13,14,15,16,17,18,19,20,21,22,23,24,25];
  diamondsPosition : Array<Number> = [26,27,28,29,30,31,32,33,34,35,36,37,38];
  clubsPosition: Array<Number> = [39,40,41,42,43,44,45,46,47,48,49,50,51];

  @Input() 
  set deck( deck : Deck )
  {
    if( deck != undefined )
    {
      this.deck = deck;
    }
    
    for( let i=0; i< this.deck.cards.length; i++)
    {
      this.deck.cards[i].imagePath = "assets" + this.deck.cards[i].imagePath;
      this.deck.cards[i].position = i;
      this.deck.cards[i].isCardDealed = false;
    }
  }

  get deck() : Deck
  {
    return this.deck
  }
}
