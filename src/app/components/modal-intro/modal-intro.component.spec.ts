import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIntroComponent } from './modal-intro.component';

describe('ModalIntroComponent', () => {
  let component: ModalIntroComponent;
  let fixture: ComponentFixture<ModalIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
