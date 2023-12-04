import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chapters } from '../../assets/chapters';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxSkeletonLoaderModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.css',
})
export class ChapterComponent implements OnInit {
  id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
  chapterData: any = {};
  versesData: any;
  language: string = 'english';
  data: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private apiServe: ApiService) {}

  ngOnInit(): void {
    this.chapterData = chapters.filter((data) => {
      return data.id === this.id;
    })[0];

    this.apiServe.getAllVersesOfChapter(this.id).subscribe({
      next: (response) => {
        this.versesData = response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  setLanguage(lang: string) {
    this.language = lang;
  }
  englishDescription(array: any[]): string {
    let data = array.filter((data: any) => {
      return data.author_name === 'Swami Sivananda';
    })[0].description;
    return data;
  }
  hindiDescription(array: any[]): string {
    let data = array.filter((data: any) => {
      return data.author_name === 'Swami Ramsukhdas';
    })[0].description;
    return data;
  }
}
