import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from './services/hacker-news.service';
import { Story } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private originalStories: Story[] = [];
  stories: Story[] = [];
  loading = true;
  mode: 'new' | 'top' = 'new';
  sort: 'asc' | 'desc' = 'desc';
  searchTerm: string = '';

  constructor(private hackerService: HackerNewsService) {}

  ngOnInit() {
    this.getInitialStories();
  }

  private getInitialStories() {
    this.hackerService.getStories('new');
    this.hackerService.stories.subscribe(stories => {
      this.stories = stories;
      this.originalStories = stories;
      if (this.searchTerm.length > 0) {
        this.filterStories(stories);
      } else {
        this.stories = stories;
      }
      this.loading = stories.length < 1;
    });
  }

  updateSearch(text: string) {
    this.searchTerm = text.replace(/ /g, '').toLowerCase();
    this.filterStories();
  }

  private filterStories(stories?: Story[]) {
    const arr = stories || this.originalStories;
    this.stories =
      this.searchTerm.length > 0
        ? arr.filter(item =>
            item.title
              .replace(/ /g, '')
              .toLowerCase()
              .includes(this.searchTerm)
          )
        : this.originalStories;
  }

  changeMode(mode: 'new' | 'top') {
    if (mode !== this.mode) {
      this.mode = mode;
      this.hackerService.getStories(mode);
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
