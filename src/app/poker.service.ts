import { Injectable } from '@angular/core';
import { Game } from './model/Game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokerService {

  constructor(private http:HttpClient) { }

  getNewGame() : Observable< Game >
  {
    return this.http.get<Game>("http://localhost:8080/api/pokergame/new", httpOptions);
  }
}
