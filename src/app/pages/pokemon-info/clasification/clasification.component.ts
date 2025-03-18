import { Component, Input } from '@angular/core';
import { switchsTitles, PokemonSpecie } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clasification',
  imports: [CommonModule],
  templateUrl: './clasification.component.html',
  styleUrl: './clasification.component.css',
})
export class ClasificationComponent {
  @Input() pokemonSpecie: PokemonSpecie;

  titles: switchsTitles[];

  ngOnInit(): void {
    this.changeTitles();
  }

  changeTitles() {
    const { is_legendary, is_mythical, has_gender_differences } =
      this.pokemonSpecie;

    const legendary = is_legendary ? 'Legendario' : 'No Legendario';
    const mythical = is_mythical ? 'Mítico' : 'No Mítico';
    const gender_differences = has_gender_differences
      ? 'Tiene Diferencia de Género'
      : 'No Tiene Diferencia de Género';

    this.titles = [
      {
        title: legendary,
        property: is_legendary,
      },
      {
        title: mythical,
        property: is_mythical,
      },
      {
        title: gender_differences,
        property: has_gender_differences,
      },
    ];
  }
}
