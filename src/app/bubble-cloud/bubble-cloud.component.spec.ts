import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleCloudComponent } from './bubble-cloud.component';

describe('BubbleCloudComponent', () => {
  let component: BubbleCloudComponent;
  let fixture: ComponentFixture<BubbleCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
