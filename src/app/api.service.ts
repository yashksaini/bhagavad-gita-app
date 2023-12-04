import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;
  headers: any = new HttpHeaders({
    'X-RapidAPI-Key': environment.apiKey,
    'X-RapidAPI-Host': environment.apiHost,
  });
  options: any = {
    headers: this.headers,
    method: 'GET',
  };
  constructor(private httpClient: HttpClient) {}

  getChapters() {
    return this.httpClient.get(
      `${this.baseUrl}chapters/?limit=18`,
      this.options
    );
  }
  getAllVersesOfChapter(chapterNo: number) {
    return this.httpClient.get(
      `${this.baseUrl}chapters/${chapterNo}/verses/`,
      this.options
    );
  }

  getVerseOfChapter(chapterNo: number, verseNo: number) {
    return this.httpClient.get(
      `${this.baseUrl}chapters/${chapterNo}/verses/${verseNo}/`,
      this.options
    );
  }
}
