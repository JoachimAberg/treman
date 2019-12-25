import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SpelareComponent } from "./spelare.component";
import { FormsModule } from "@angular/forms";
import { TremanService } from "../treman.service";
import { Spelare } from '../spelare';

describe("SpelareComponent", () => {
  let component: SpelareComponent;
  let fixture: ComponentFixture<SpelareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SpelareComponent],
      providers: [TremanService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelareComponent);
    component = fixture.componentInstance;
    component.spelare = new Spelare();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
