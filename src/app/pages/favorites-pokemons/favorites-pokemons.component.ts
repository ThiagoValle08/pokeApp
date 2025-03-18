import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../services/pokemon.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import * as Aos from 'aos';

@Component({
  selector: 'app-favorites-pokemons',
  imports: [CommonModule, RouterModule, MatCardModule, LoaderComponent],
  templateUrl: './favorites-pokemons.component.html',
  styleUrl: './favorites-pokemons.component.css',
})
export class FavoritesPokemonsComponent {
  favoritesPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    Aos.init();

    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.length > 0) {
      this.pokemonService.getPokemonsByIds(favorites).subscribe((data) => {
        this.favoritesPokemons = data;
      });
    } else {
      this.favoritesPokemons = [];
    }
  }

  toggleFavorite(pokemon: any): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    favorites = favorites.filter((id) => id !== pokemon.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.loadFavorites();
  }
}
