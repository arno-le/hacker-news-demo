import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Story } from '../models';
@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  apiBaseUrl: string;
  stories: BehaviorSubject<Story[]> = new BehaviorSubject([]);
  storyCache: { [key: number]: Story } = {};
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseurl;
  }

  getNews(mode: 'top' | 'new') {
    this.stories.next([]);
    this.httpClient
      .get<number[]>(this.apiBaseUrl + mode + 'stories.json')
      .subscribe(data => this.getStories(data));
  }

  private getStories(ids: number[]) {
    ids.map(id => {
      if (this.storyCache[id]) {
        this.pushNewStory(this.storyCache[id]);
      } else {
        this.httpClient
          .get<Story>(this.apiBaseUrl + 'item/' + id + '.json')
          .subscribe(newsItem => this.pushNewStory(newsItem));
      }
    });
  }

  private pushNewStory(newStory: Story) {
    this.storyCache[newStory.id] = newStory;
    const oldItems = this.stories.getValue();
    const newItems = [...oldItems, newStory];
    this.sort(newItems);
  }

  private sort(items?: Story[], order?: 'asc' | 'desc') {
    let currentItems = items || this.stories.getValue();
    currentItems.sort((a, b) => a.score - b.score);
    // Change detection workaround
    (order || this.sortOrder) === 'desc'
      ? this.stories.next(currentItems.reverse())
      : this.stories.next(currentItems);
  }

  public changeSortOrder(sortOrder: 'asc' | 'desc') {
    this.sortOrder = sortOrder;
    this.sort(null, sortOrder);
  }
}
