import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HackerNewsService } from './services/hacker-news.service';
import { HttpClientModule } from '@angular/common/http';
import { NewsItemComponent } from './components/news-item/news-item.component';

@NgModule({
  declarations: [AppComponent, NewsItemComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
