import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryComponent } from './story.component';

describe('CardComponent', () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the right inputs', () => {
    component.title = 'Title';
    component.author = 'Author';
    component.score = 123;
    component.href = 'http://link.here/';
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a').innerText).toEqual('Title');
    expect(fixture.nativeElement.querySelector('a').href).toEqual(
      'http://link.here/'
    );
    expect(fixture.nativeElement.querySelector('small').innerText).toEqual(
      'Author'
    );
    expect(
      fixture.nativeElement.querySelector(
        'div > div.score > p:nth-child(1)'
      ).innerText
    ).toEqual('123');
  });
});
