import { Injectable } from '@angular/core';
import { Game } from './model/Game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { CardDeal } from './model/CardDeal';
import { GameResult } from './model/GameResult';


@Injectable({
  providedIn: 'root'
})
export class PokerService {

  constructor(private http:HttpClient) { }

  getNewGame() : Observable< Game >
  {
    return this.http.get<Game>("http://localhost:8080/api/pokergame/new", {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
  }

  dealCard( cardDeal : CardDeal ) : Observable< GameResult >
  {
    console.log( JSON.stringify( cardDeal ) );
    return this.http.post<GameResult>("http://localhost:8080/api/pokergame/deal", cardDeal,   {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
  }

  dealCardBackToDeck( cardDeal : CardDeal ) : Observable< GameResult >
  {
    console.log( JSON.stringify( cardDeal ) );
    return this.http.post<GameResult>("http://localhost:8080/api/pokergame/dealBackToDeck", cardDeal,   {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
  }

}
