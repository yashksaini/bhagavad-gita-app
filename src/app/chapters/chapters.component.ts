import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chapters } from '../../assets/chapters';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css',
})
export class ChaptersComponent implements OnInit {
  public chaptersData: any = chapters;
  public language: string = 'english';
  public isLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  setLanguage(lang: string) {
    this.language = lang;
  }
}
