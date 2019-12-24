import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelareComponent } from './spelare.component';

describe('SpelareComponent', () => {
  let component: SpelareComponent;
  let fixture: ComponentFixture<SpelareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
