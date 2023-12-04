import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChapterComponent } from './chapter/chapter.component';
import { SlokComponent } from './slok/slok.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChapterIdGuard } from './chapter-id.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'chapters',
    component: ChaptersComponent,
  },
  {
    path: 'chapter/:id',
    component: ChapterComponent,
    canActivate: [ChapterIdGuard],
  },
  {
    path: 'chapter/:id/shlok/:sid',
    component: SlokComponent,
  },
  {
    path: 'progress',
    component: BookmarksComponent,
  },
  {
    path: '**',
    component: HomeComponent,
    redirectTo: '',
  },
];
