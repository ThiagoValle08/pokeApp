import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificationSwitchsComponent } from './clasification-switchs.component';

describe('ClasificationSwitchsComponent', () => {
  let component: ClasificationSwitchsComponent;
  let fixture: ComponentFixture<ClasificationSwitchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificationSwitchsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificationSwitchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
