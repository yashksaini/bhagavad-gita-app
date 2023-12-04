import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chapters } from '../../assets/chapters';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
})
export class BookmarksComponent implements OnInit {
  chapters: any = chapters;
  public language: string = 'english';
  public isLoading: boolean = true;
  progress: any;

  ngOnInit(): void {
    this.progress = JSON.parse(localStorage.getItem('progress')!);
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  setLanguage(lang: string) {
    this.language = lang;
  }
  counter(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }
}
