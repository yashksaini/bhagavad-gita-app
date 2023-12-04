import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChapterIdGuard {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): any {
    const id = parseInt(next.paramMap.get('id')!);

    if (id >= 1 && id <= 18) {
      // Allow navigation
      return true;
    } else {
      // Redirect to '/chapters' if ID is invalid
      return this.router.parseUrl('/chapters');
    }
  }
}
