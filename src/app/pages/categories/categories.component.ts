import { Component } from '@angular/core';
import { categories } from '../interfaces';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private pokemonService: PokemonService) {}

  categories: categories[] | [] = [
    {
      title: 'Electrico',
      image: 'categories_images/electric.png',
      urlApi: '13',
    },
    {
      title: 'Agua',
      image: 'categories_images/water.png',
      urlApi: '11',
    },
    {
      title: 'Fuego',
      image: 'categories_images/fire.png',
      urlApi: '10',
    },

    {
      title: 'Roca',
      image: 'categories_images/rock.png',
      urlApi: '6',
    },
    {
      title: 'Volador',
      image: 'categories_images/flying.png',
      urlApi: '3',
    },
    {
      title: 'Luchador',
      image: 'categories_images/struggle.png',
      urlApi: '2',
    },
    {
      title: 'Oscuridad',
      image: 'categories_images/dark.png',
      urlApi: '17',
    },
    {
      title: 'Hielo',
      image: 'categories_images/ice.png',
      urlApi: '15',
    },
    {
      title: 'Planta',
      image: 'categories_images/plant.png',
      urlApi: '12',
    },
    {
      title: 'Fantasma',
      image: 'categories_images/ghost.png',
      urlApi: '8',
    },
    {
      title: 'Psiquico',
      image: 'categories_images/psychic.png',
      urlApi: '14',
    },
    {
      title: 'Veneno',
      image: 'categories_images/poison.png',
      urlApi: '4',
    },
  ];

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchPokemonsByCategory(id: string) {
    this.pokemonService.searchCategory(id).subscribe((pokemons) => {});
  }
}
