import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonInfo } from '../../../interfaces';
import * as Aos from 'aos';

@Component({
  selector: 'app-basic-info',
  imports: [CommonModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent {
  @Input() pokemon: PokemonInfo;
  @Input() color: string;

  ngOnInit(): void {
    Aos.init();
  }
}
