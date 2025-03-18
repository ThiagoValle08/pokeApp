import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { PokemonInfoComponent } from './pages/pokemon-info/pokemon-info.component';
import { FavoritesPokemonsComponent } from './pages/favorites-pokemons/favorites-pokemons.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'categories/:name/:id',
    component: HomeComponent,
  },
  {
    path: 'pokemon/:id',
    component: PokemonInfoComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPokemonsComponent,
  },
];
