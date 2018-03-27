import { AfterViewInit, Directive, ElementRef, Injectable, Input } from '@angular/core';
import { PermissionService } from './permission.service';

@Directive({
  selector: '[permissions-include],[permissions-exclude],[permissions-all],',
})
export class PermissionDirective implements AfterViewInit {

  public classToHide = 'hidden';
  @Input('permissions-include')
  public permissionsInclude: string;

  @Input('permissions-exclude')
  public permissionsExclude: string;
  @Input('permissions-all')
  public permissionsAll: string;

  constructor(private _elementRef: ElementRef,
              private _permissionService: PermissionService) {
  }

  ngAfterViewInit(): void {
    this._permissionService.observePermisison({
      include: this.permissionsInclude,
      exclude: this.permissionsExclude,
      all: this.permissionsAll
    }).subscribe((isValid) => {
      if (isValid) {
        this._elementRef.nativeElement.classList.remove(this.classToHide)
      } else {
        this._elementRef.nativeElement.classList.add(this.classToHide)
      }
    });
  }
}

