import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  allPokemons: any = [];
  ApiUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  baseUrl: string = 'https://pokeapi.co/api/v2/';

  private categorySubject = new BehaviorSubject<any>(null);
  category$ = this.categorySubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<any[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(this.ApiUrl)
      .pipe(
        map((response) => response.results),
        map((results) =>
          results.map((pokemon) => this.http.get<any>(pokemon.url))
        ),
        switchMap((requests) => forkJoin(requests))
      );
  }

  searchCategory(id: string): Observable<any[]> {
    const url = `https://pokeapi.co/api/v2/type/${id}`;

    return this.http
      .get<{ pokemon: { pokemon: { name: string; url: string } }[] }>(url)
      .pipe(
        tap((response) => {
          this.categorySubject.next(response);
        }),
        switchMap((response) => {
          const requests = response.pokemon.map((p) =>
            this.http.get<any>(p.pokemon.url)
          );
          return forkJoin(requests);
        })
      );
  }

  getPokemonById(id: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http.get(url);
  }

  getPokemonsByIds(ids: number[]): Observable<any[]> {
    const requests = ids.map((id) =>
      this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    );
    return forkJoin(requests);
  }

  getPokemonSpecie(id: string) {
    return this.http.get<any>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
  }

  getEvolutionChain(pokemonId: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon-species/${pokemonId}`)
      .pipe(
        switchMap((speciesData) =>
          this.http.get<any>(speciesData.evolution_chain.url)
        ), // Obtener datos de evolución
        switchMap((evolutionData) =>
          this.extractEvolutionChain(evolutionData.chain)
        )
      );
  }

  // Extraer la evolución y obtener imágenes
  private extractEvolutionChain(chain: any): Observable<any[]> {
    const evolutionChain: any[] = [];

    let evoChain = chain;
    while (evoChain) {
      evolutionChain.push(evoChain.species.name);
      evoChain = evoChain.evolves_to.length ? evoChain.evolves_to[0] : null;
    }

    // Obtener las imágenes de los Pokémon en la cadena de evolución
    const requests = evolutionChain.map((name) =>
      this.http.get<any>(`${this.baseUrl}/pokemon/${name}`).pipe(
        map((pokemonData) => ({
          name: pokemonData.name,
          image: pokemonData.sprites.other['official-artwork'].front_default,
        }))
      )
    );

    return forkJoin(requests); // Ejecutar todas las peticiones en paralelo
  }
}
