import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonSpecie } from '../../../interfaces';
import {
  CircleProgressOptions,
  NgCircleProgressModule,
} from 'ng-circle-progress';

@Component({
  selector: 'app-progress-bars',
  imports: [CommonModule, NgCircleProgressModule],
  templateUrl: './progress-bars.component.html',
  styleUrl: './progress-bars.component.css',
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {
        radius: 60,
        outerStrokeWidth: 20,
        innerStrokeWidth: 5,
        titleColor: 'black',
        subtitleColor: 'black',
        backgroundGradient: true,
        innerStrokeColor: 'black',
        backgroundColor: 'white',
        animation: true,
        animationDuration: 400,
      },
    },
  ],
})
export class ProgressBarsComponent {
  @Input() pokemonSpecie: PokemonSpecie;
  base_happiness = 0;
  progressColor = 'red';
  capture_rate = 0;

  ngOnInit(): void {
    const { base_happiness, color, capture_rate } = this.pokemonSpecie;
    this.base_happiness = base_happiness;
    this.progressColor = color.name;
    this.capture_rate = capture_rate;
  }
}
