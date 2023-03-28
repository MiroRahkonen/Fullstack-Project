import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesURL = 'api/heroes';  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const URL = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(URL).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesURL,hero,this.httpOptions).pipe(
      tap((newHero: Hero)=> this .log(`Added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesURL,hero,this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  deleteHero(id: number): Observable<Hero>{
    const URL = `${this.heroesURL}/${id}`;

    return this.http.delete<Hero>(URL,this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`Found heroes matching the term "${term}"`) :
         this.log(`No heroes matching term "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}