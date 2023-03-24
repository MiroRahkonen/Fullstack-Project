import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    this.messageService.add('HeroService: Fetches heroes');

    const heroes = of(HEROES)
    return heroes;
  }

  getHero(id: number): Observable<Hero>{
    const hero = HEROES.find(hero => hero.id === id)!;
    this.messageService.add(`HeroService: Fetched with id: ${id}`);
    
    return of(hero);
  }
}
