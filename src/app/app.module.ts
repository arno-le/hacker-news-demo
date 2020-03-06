import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HackerNewsService } from './services/hacker-news.service';
import { HttpClientModule } from '@angular/common/http';
import { StoryComponent } from './components/story/story.component';

@NgModule({
  declarations: [AppComponent, StoryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [HackerNewsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
