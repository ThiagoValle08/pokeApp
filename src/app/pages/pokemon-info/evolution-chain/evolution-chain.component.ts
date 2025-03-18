import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import * as Aos from 'aos';

@Component({
  selector: 'app-evolution-chain',
  imports: [CommonModule],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.css',
})
export class EvolutionChainComponent {
  responsiveOptions: any[] | undefined;

  @Input() evolutionChain: any;
  @Input() color: any;

  ngOnInit() {
    Aos.init();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
