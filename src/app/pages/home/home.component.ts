import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchPokemon: string = '';
  numberPokemons: number = 30;
  loadingInitial: boolean = true;
  loadingSearch: boolean = false;
  categoryId: string | null = null;
  category: any;
  showImage: boolean = true;
  title: string = 'Inicio';
  pokemonsByCategory: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    Aos.init();

    this.scrollToTop();
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');

      if (this.categoryId) {
        this.getPokemonsByCategory(this.categoryId);
      } else {
        this.getPokemons();
      }
    });

    this.loadFavorites();
  }

  getPokemons() {
    this.pokemonService.getAllPokemons().subscribe(async (data) => {
      this.pokemons = data.map((pokemon) => ({
        ...pokemon,
        loading: true,
        favorite: false,
      }));

      this.filteredPokemons = this.pokemons.slice(0, this.numberPokemons);

      this.markFavorites();
    });
  }

  markFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    this.filteredPokemons.forEach((pokemon) => {
      if (favorites.includes(pokemon.id)) {
        pokemon.favorite = true;
      }
    });
  }

  loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favorites.length > 0) {
      this.pokemons.forEach((pokemon) => {
        if (favorites.includes(pokemon.id)) {
          pokemon.favorite = true;
        }
      });
    }
  }

  toggleFavorite(pokemon: any): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (pokemon.favorite) {
      favorites = favorites.filter((id) => id !== pokemon.id);
    } else {
      favorites.push(pokemon.id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    pokemon.favorite = !pokemon.favorite;
  }

  getPokemonsByCategory(id: string) {
    this.pokemonService.searchCategory(id).subscribe((pokemons) => {
      this.pokemons = pokemons.map((pokemon) => ({
        ...pokemon,
        loading: true,
      }));
      this.filteredPokemons = this.pokemons.slice(0, this.numberPokemons);
      this.loadingInitial = false;

      this.markFavorites();
    });

    this.pokemonService.category$.subscribe((category) => {
      this.category = category;
      this.title = `Categoria -`;
    });

    this.pokemonsByCategory = this.filteredPokemons;
  }

  onImageLoad(pokemon: any) {
    pokemon.loading = false;
  }

  imageLoad() {
    this.showImage = true;
    this.loadingInitial = false;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterPokemons() {
    const filtered = this.pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(this.searchPokemon.toLowerCase())
    );

    if (filtered.length > 0) {
      this.loadingSearch = false;
    } else {
      this.loadingSearch = true;
    }

    this.filteredPokemons = filtered.slice(0, this.numberPokemons);
  }

  showMore() {
    this.numberPokemons += 30;
    this.filterPokemons();
  }
}
