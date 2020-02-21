import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  apiBaseUrl: string;
  stories: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseurl;
  }

  getNews(mode: 'top' | 'new') {
    this.stories.next([]);
    this.httpClient
      .get<number[]>(this.apiBaseUrl + mode + 'stories.json?print=pretty')
      .subscribe(data => this.getStories(data));
  }

  private getStories(ids: number[]) {
    ids.map(id =>
      this.httpClient
        .get<any>(this.apiBaseUrl + 'item/' + id + '.json?print=pretty')
        .subscribe(newsItem => {
          const oldItems = this.stories.getValue();
          const newItems = [...oldItems, newsItem];
          this.stories.next(newItems);
        })
    );
  }
}
