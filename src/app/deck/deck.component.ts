import { Component, OnInit, Input } from "@angular/core";
import { Deck } from "../model/Deck";
import { ActiveCardPosition } from "../model/ActiveCardPosition";
import { CardDeal } from "../model/CardDeal";
import { Game } from "../model/Game";
import { Card } from "../model/Card";
import { Player } from "../model/Player";
import { PokerService } from '../poker.service';

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
  set deck(deck: Deck) {
    if (deck != undefined && deck != null) {
      this._deck = deck;
      for (let i = 0; i < this._deck.cards.length; i++) {
        this._deck.cards[i].imagePath =
          "http://localhost:8080/api/pokergame" + this._deck.cards[i].imagePath;
        this._deck.cards[i].isCardDealed = false;
      }
    }
  }

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
    console.log("received input for game in Deck Component");
  }

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
      new Card(number, suit, null, false, false),
      this._activeCard.isPlayer,
      this._activeCard.isBoard,
      new Player(this._activeCard.playerName, null)
    );
    
    this.pokerService.dealCard( cardDeal ).subscribe(
      data => 
      {
        this._game = data.game;
        this._deck = data.game.deck;
      } 
    );

  }

  get deck(): Deck {
    return this._deck;
  }
}
