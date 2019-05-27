import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlluvialDiagramComponent } from './alluvial-diagram.component';

describe('AlluvialDiagramComponent', () => {
  let component: AlluvialDiagramComponent;
  let fixture: ComponentFixture<AlluvialDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlluvialDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlluvialDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
