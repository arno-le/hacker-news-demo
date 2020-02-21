import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { HackerNewsService } from './hacker-news.service';

describe('HackerNewsService', () => {
  let injector: TestBed;
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService]
    });
    injector = getTestBed();
    service = injector.inject(HackerNewsService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('- getNews', () => {
    it('should have a NewsItem[] in stories after fetching them ', () => {
      // Call the method
      service.getNews('new');

      // Setup Http mocks returning dummy items
      const dummyNews = [
        {
          by: 'joku',
          descendants: 0,
          id: 22212336,
          score: 321,
          time: 1581402233,
          title: 'Lorem ipsum',
          type: 'story',
          url: 'https://medium.com'
        }
      ];

      // All items
      const allReq = httpMock.expectOne(
        `${service.apiBaseUrl}newstories.json?print=pretty`
      );
      expect(allReq.request.method).toBe('GET');
      allReq.flush([dummyNews[0].id]);
      // Single
      const singleItemReq = httpMock.expectOne(
        `${service.apiBaseUrl}item/${dummyNews[0].id}.json?print=pretty`
      );
      expect(singleItemReq.request.method).toBe('GET');
      singleItemReq.flush(dummyNews[0]);
      
      // Test the content
      service.stories.subscribe(news => {
        expect(news.length).toBe(1);
        expect(news).toEqual(dummyNews);
      });
    });
  });
});
