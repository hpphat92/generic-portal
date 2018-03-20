import { Component, NgZone, OnInit } from '@angular/core';
import * as _config from '../../config.json';

let config = _config as any;
const SMALL_WiDTH_BREAKPOINT = 768;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public config = config;
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WiDTH_BREAKPOINT}px`);
  public sidebarMenus = [
    {
      title: 'Home',
      iconUrl: 'assets/images/computer.svg',
      href: '/auth/home',
    },
    {
      title: 'Events',
      iconUrl: 'assets/images/laptop.svg',
      href: '/auth/events',
    },
    {
      title: 'Places',
      iconUrl: 'assets/images/laptop.svg',
      href: '/auth/google-place',
    },
  ];

  constructor(private zone: NgZone) {
    this.mediaMatcher.addListener((mql) => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }
}
