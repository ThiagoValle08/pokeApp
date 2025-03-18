import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonInfo, PokemonSpecie } from '../../interfaces';

import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { ClasificationComponent } from './clasification/clasification.component';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';

import * as Aos from 'aos';

@Component({
  selector: 'app-pokemon-info',
  imports: [
    RouterModule,
    CommonModule,
    BasicInfoComponent,
    ProgressBarsComponent,
    NgOptimizedImage,
    ClasificationComponent,
    EvolutionChainComponent,
  ],
  templateUrl: './pokemon-info.component.html',
  styleUrl: './pokemon-info.component.css',
})
export class PokemonInfoComponent {
  pokemonId: any = '';
  pokemon: PokemonInfo;
  pokemonSpecie: PokemonSpecie;
  descripcionPokemon: string;
  urlImage: string = '';
  evolutionChain: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    Aos.init();

    this.scrollToTop();
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    this.getPokemon();
    this.getPokemonSpecie(this.pokemonId);
    this.getEvolutionChain();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPokemon() {
    this.pokemonService.getPokemonById(this.pokemonId).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.urlImage = this.pokemon.sprites.other.dream_world.front_default;
    });
  }

  getPokemonSpecie(id: string) {
    this.pokemonService.getPokemonSpecie(id).subscribe({
      next: (data) => {
        this.pokemonSpecie = data;

        const infoEspanol = data.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es'
        );

        this.descripcionPokemon = infoEspanol
          ? infoEspanol.flavor_text
          : 'Descripción no encontrada';
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
  }

  changeImage(url: string) {
    this.urlImage = url;
  }

  getEvolutionChain() {
    this.pokemonService.getEvolutionChain(this.pokemonId).subscribe((data) => {
      this.evolutionChain = data;
    });
  }
}
