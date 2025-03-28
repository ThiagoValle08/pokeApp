import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPokemonsComponent } from './favorites-pokemons.component';

describe('FavoritesPokemonsComponent', () => {
  let component: FavoritesPokemonsComponent;
  let fixture: ComponentFixture<FavoritesPokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPokemonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
