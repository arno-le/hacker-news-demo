import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './services/hacker-news.service';
import { Story } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  news: Story[] = [];
  loading = true;
  mode: 'new' | 'top' = 'new';
  sort: 'asc' | 'desc' = 'desc';
  searchTerm: string = '';

  constructor(private hackerService: HackerNewsService) {}

  ngOnInit() {
    this.getInitialNews();
  }

  private getInitialNews() {
    this.hackerService.getNews('new');
    this.hackerService.stories.subscribe(stories => {
      this.news = stories;
      if (this.searchTerm.length > 0) {
        this.filterNews(stories);
      } else {
        this.news = stories;
      }
      this.loading = stories.length < 1;
    });
  }

  updateSearch(text: string) {
    this.searchTerm = text.replace(/ /g, '').toLowerCase();
    this.filterNews();
  }

  private filterNews(news?: Story[]) {
    const arr = news || this.news;
    this.news = arr.filter(item =>
      item.title
        .replace(/ /g, '')
        .toLowerCase()
        .includes(this.searchTerm)
    );
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
