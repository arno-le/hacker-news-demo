import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './services/hacker-news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  news = [];
  loading = true;
  mode: 'new' | 'top' = 'new';

  constructor(private hackerService: HackerNewsService) {}

  ngOnInit() {
    this.getInitialNews();
  }

  private getInitialNews() {
    this.hackerService.getNews('new');
    this.hackerService.stories.subscribe(stories => {
      this.news = stories;
      this.loading = stories.length < 1;
    });
  }

  public async changeMode(mode: 'new' | 'top') {
    if (mode !== this.mode) {
      this.mode = mode;
      this.hackerService.getNews('new');
    }
  }
}
