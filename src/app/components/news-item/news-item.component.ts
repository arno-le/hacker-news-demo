import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input() href = '';
  @Input() title = '';
  @Input() score = 0;
  @Input() author = '';
}
