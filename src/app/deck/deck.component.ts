import { Component, OnInit, Input, Output } from "@angular/core";
import { Deck } from "../model/Deck";
import { ActiveCardPosition } from "../model/ActiveCardPosition";
import { CardDeal } from "../model/CardDeal";
import { Game } from "../model/Game";
import { Card } from "../model/Card";
import { Player } from "../model/Player";
import { PokerService } from '../poker.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: "app-deck",
  templateUrl: "./deck.component.html",
  styleUrls: ["./deck.component.scss"]
})
export class DeckComponent implements OnInit {
  constructor( private pokerService : PokerService  ) {}

  private _deck: Deck;
  private _activeCard: ActiveCardPosition;
  private _game: Game;

  ngOnInit() {}

  @Input()
  set activeCard(activeCard: ActiveCardPosition) {
    if (activeCard != undefined && activeCard != null) {
      this._activeCard = activeCard;
      console.log(
        "Event Received in Deck Component: " +
          this._activeCard.isBoard +
          " - " +
          this._activeCard.cardPosition
      );
    }
  }

  @Input()
  set game(game: Game) {
    this._game = game;
    if (game.deck != undefined && game.deck != null) {
      this._deck = game.deck;
    }
    console.log("received input for game in Deck Component");
  }

  @Output() 
  gameEvent : EventEmitter<Game> = new EventEmitter();

  @Output() 
  dealtCardEvent : EventEmitter<Card> = new EventEmitter();

  getImage(number: String, suit: String) {
    for (let card of this._deck.cards) {
      if (card.number === number && card.suit === suit) {
        return card.imagePath;
      }
    }
    return "http://localhost:8080/api/pokergame" + "/images/gray_back.png";
  }

  dealDeckCard(number: String, suit: String) {
    console.log(number + " of " + suit + " dealed");
    let cardDeal = new CardDeal(
      this._game,
      new Card(number, suit, this.getImage(number, suit), false, false),
      this._activeCard != undefined ? this._activeCard.isPlayer : false,
      this._activeCard != undefined ? this._activeCard.isBoard : false,
      new Player(this._activeCard.playerName, null)
    );
    
    this.pokerService.dealCard( cardDeal ).subscribe(
      data => 
      {
        this._game = data.game;
        this._deck = data.game.deck;
        this.gameEvent.emit( this._game );
        this.dealtCardEvent.emit( cardDeal.dealtCard );
      } 
    );

  }

  get deck(): Deck {
    return this._deck;
  }
}
