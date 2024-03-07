import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationHistory: string[] = []

  constructor(private router: Router, private location: Location) { }

  startSavingNavigationHistory():void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navigationHistory.push(event.urlAfterRedirects)
      }
    })
  }

  goBack(): void {
    this.navigationHistory.pop();

    if (this.navigationHistory.length > 0) {
      this.location.back()
    } else {
      void this.router.navigateByUrl("/")
    }
  }
}
