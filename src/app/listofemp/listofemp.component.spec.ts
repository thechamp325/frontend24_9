import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofempComponent } from './listofemp.component';

describe('ListofempComponent', () => {
  let component: ListofempComponent;
  let fixture: ComponentFixture<ListofempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
