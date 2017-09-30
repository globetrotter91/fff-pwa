import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureItemComponent } from './fixture-item.component';

describe('FixtureItemComponent', () => {
  let component: FixtureItemComponent;
  let fixture: ComponentFixture<FixtureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
