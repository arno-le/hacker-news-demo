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
  sort: 'asc' | 'desc' = 'desc';

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

  changeMode(mode: 'new' | 'top') {
    if (mode !== this.mode) {
      this.mode = mode;
      this.hackerService.getNews(mode);
    }
  }

  changeSort(sort: 'asc' | 'desc') {
    if (sort !== this.sort) {
      this.sort = sort;
      this.hackerService.changeSortOrder(sort);
    }
  }

  trackByStoryId(index, story) {
    return story ? story.id : index;
  }
}
