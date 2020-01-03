import { Component, OnInit, Input } from '@angular/core';
import { Deck } from '../model/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  constructor() { }

  private _deck : Deck;

  ngOnInit() {
  }

  @Input() 
  set deck( deck : Deck )
  {
    if( deck != undefined )
    {
      this._deck = deck;
    }
    
    for( let i=0; i< this._deck.cards.length; i++)
    {
      this._deck.cards[i].imagePath = "http://localhost:8080/api/pokergame" + this._deck.cards[i].imagePath;
      this._deck.cards[i].isCardDealed = false;
    }
  }

  getImage( number : String, suit : String )
  {
    for( let card of this._deck.cards )
    {
      if( card.number === number && card.suit === suit )
      {
        return card.imagePath;
      }
    }
  }

  dealDeckCard( number : String, suit : String )
  {
    console.log( number + " of " + suit + " dealed");
  }

  get deck() : Deck
  {
    return this._deck
  }
}
