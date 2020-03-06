import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
  @Input() href = '';
  @Input() title = '';
  @Input() score = 0;
  @Input() author = '';
}
