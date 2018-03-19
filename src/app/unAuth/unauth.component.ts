import { Component, NgZone, OnInit } from '@angular/core';
import * as _config from '../../config.json';
let config = _config as any;

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.scss']
})
export class UnAuthComponent implements OnInit {
  public config = config;

  constructor(private zone: NgZone) {
  }

  ngOnInit() {
  }
}
