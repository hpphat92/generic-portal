import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public header = 'Home';

  @Output()
  public toggleSidenav = new EventEmitter<void>();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        if(event.snapshot.data && event.snapshot.data.title){
          this.header = event.snapshot.data && event.snapshot.data.title || 'Home';
        }
      }
    });
  }

  ngOnInit() {
  }

  gotoProfile() {
    this.router.navigateByUrl('auth/profile');
  }
}
