import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/services/auth';
import { Title } from '@angular/platform-browser';
import * as _config from '../config.json';

let config = _config as any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {

  showLoading = false;
  routeChangeSubscriber: any;

  constructor(private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
    this.title.setTitle(config.site.title);
    let s = document.createElement('script');
    s.async = false;
    s.type = 'text/javascript';
    s.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey.googleApi}&libraries=places`
    document.body.appendChild(s);
  }

  ngOnDestroy(): void {
    this.authService.showLoading$.unsubscribe();
    this.routeChangeSubscriber && this.routeChangeSubscriber.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.authService.showLoading$.subscribe((isShowLoading) => {
      setTimeout(() => {
        this.showLoading = isShowLoading
      }, 0);
    });
  }
}
