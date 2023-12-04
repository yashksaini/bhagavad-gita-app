import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { chapters } from '../../assets/chapters';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { tAuthors, cAuthors } from '../../assets/authors';

@Component({
  selector: 'app-slok',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './slok.component.html',
  styleUrl: './slok.component.css',
})
export class SlokComponent implements OnInit {
  chapter: number = 1;
  shlok: number = 1;
  totalVerses: number[] = chapters.map((data) => data.verses_count);
  data: any;
  language: string = 'english';
  progress: any = JSON.parse(localStorage.getItem('progress')!);
  navigationData: any = {
    prevCh: 1,
    nextCh: 1,
    prevSh: 1,
    nextSh: 1,
  };
  isLoading: boolean = true;
  translation: any = {
    hinTAuthor: 'Swami Ramsukhdas',
    engTAuthor: 'Swami Sivananda',
    hinCAuthor: 'Swami Ramsukhdas',
    engCAuthor: 'Swami Sivananda',
  };
  authors: any = {
    tAuthors: [],
    cAuthors: [],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAuthorNames();
    this.route.paramMap.subscribe((params) => {
      this.chapter = parseInt(params.get('id')!);
      this.shlok = parseInt(params.get('sid')!);
      this.progress = JSON.parse(localStorage.getItem('progress')!);

      this.apiService.getVerseOfChapter(this.chapter, this.shlok).subscribe({
        next: (response) => {
          this.data = response;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(error);
        },
      });

      this.updateNavigationData();
    });
  }

  setAuthor(event: any, type: string) {
    if (this.language === 'english') {
      if (type === 'translation') {
        this.translation.engTAuthor = event.target.value;
      } else {
        this.translation.engCAuthor = event.target.value;
      }
    } else {
      if (type === 'translation') {
        this.translation.hinTAuthor = event.target.value;
      } else {
        this.translation.hinCAuthor = event.target.value;
      }
    }
  }
  getAuthorNames() {
    this.authors.tAuthors = tAuthors.filter((data: any) => {
      return data.language == this.language;
    });
    this.authors.cAuthors = cAuthors.filter((data: any) => {
      return data.language == this.language;
    });
  }

  updateNavigationData() {
    this.navigationData = {
      prevCh: this.shlok === 1 ? this.prevCh(this.chapter) : this.chapter,
      nextCh:
        this.shlok === this.totalVerses[this.chapter - 1]
          ? this.nextCh(this.chapter)
          : this.chapter,
      prevSh:
        this.shlok === 1
          ? this.totalVerses[this.prevCh(this.chapter) - 1]
          : this.prevSh(this.shlok),
      nextSh:
        this.shlok === this.totalVerses[this.chapter - 1]
          ? 1
          : this.nextSh(this.shlok),
    };
  }
  prevSh(sh: number) {
    return --sh;
  }
  nextSh(sh: number) {
    return ++sh;
  }
  prevCh(ch: number) {
    return ch === 1 ? 18 : --ch;
  }
  nextCh(ch: number) {
    return ch === 18 ? 1 : ++ch;
  }
  getTextWithLineBreaks(text: string) {
    return text
      ?.split('\n\n')
      .map((line) => line.trim())
      .join('<br>');
  }
  setLanguage(lang: string) {
    this.language = lang;
    this.getAuthorNames();
  }
  goToPrev() {
    this.isLoading = true;
    this.router.navigate([
      '/chapter',
      this.navigationData.prevCh,
      'shlok',
      this.navigationData.prevSh,
    ]);
  }
  goToNext() {
    this.isLoading = true;
    this.router.navigate([
      '/chapter',
      this.navigationData.nextCh,
      'shlok',
      this.navigationData.nextSh,
    ]);
  }
  descFinder(array: any[], author: string) {
    let finalDesc = array?.filter((data: any) => {
      return data.author_name === author;
    })[0].description;
    return finalDesc;
  }
  markCompleted() {
    let arr = JSON.parse(localStorage.getItem('progress')!);
    let elemIndex = arr[this.chapter - 1].indexOf(this.shlok);
    if (elemIndex !== -1) {
      arr[this.chapter - 1].splice(elemIndex, 1);
    } else {
      arr[this.chapter - 1].push(this.shlok);
    }
    this.progress = arr;
    localStorage.setItem('progress', JSON.stringify(arr));
  }
}
