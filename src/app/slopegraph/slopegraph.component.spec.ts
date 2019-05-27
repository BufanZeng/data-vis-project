import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlopegraphComponent } from './slopegraph.component';

describe('SlopegraphComponent', () => {
  let component: SlopegraphComponent;
  let fixture: ComponentFixture<SlopegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlopegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlopegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
