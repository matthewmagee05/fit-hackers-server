import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopInstructorsWrapperComponent } from './top-instructors-wrapper.component';

describe('TopInstructorsWrapperComponent', () => {
  let component: TopInstructorsWrapperComponent;
  let fixture: ComponentFixture<TopInstructorsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopInstructorsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopInstructorsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
