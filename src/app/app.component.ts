import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './shared/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit {

  showLoading = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.authService.showLoading$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.authService.showLoading$.subscribe((isShowLoading) => {
      setTimeout(() => {
        this.showLoading = isShowLoading
      }, 0);
    });
  }
}
