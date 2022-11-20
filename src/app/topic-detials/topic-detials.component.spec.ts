import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetialsComponent } from './topic-detials.component';

describe('TopicDetialsComponent', () => {
  let component: TopicDetialsComponent;
  let fixture: ComponentFixture<TopicDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDetialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
