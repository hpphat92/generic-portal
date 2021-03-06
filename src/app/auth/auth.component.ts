import { Component, NgZone, OnInit } from '@angular/core';
import * as _config from '../../config.json';
import { GenericService } from '../generic';
import * as _ from 'lodash';

let config = _config as any;
const SMALL_WiDTH_BREAKPOINT = 768;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public config = config;
  public mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WiDTH_BREAKPOINT}px`);
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
      title: 'Google Places Search',
      iconUrl: 'assets/images/laptop.svg',
      href: '/auth/google-place',
    },
    {
      title: 'Saved Places',
      iconUrl: 'assets/images/laptop.svg',
      href: '/auth/saved-places',
    },
    {
      title: 'Users',
      iconUrl: 'assets/images/chat.svg',
      href: '/auth/users',
    },
    ..._.map(GenericService.config, (config) => {
      return {
        title: config.pageTitle || config.moduleName,
        href: `${config.isAuth ? '/auth/' : '/'}${config.path || config.moduleName}/all`,
        iconUrl: config.moduleIconUrl || 'assets/images/chat.svg',
        roles: config.roles
      }
    })
  ];

  constructor(private zone: NgZone) {
    this.mediaMatcher.addListener((mql) => zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }
}
