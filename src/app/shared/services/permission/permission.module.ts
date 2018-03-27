import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PermissionDirective } from './permission.directive';
import { PermissionService } from './permission.service';
import { Router } from '@angular/router';
import './permission.scss'

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PermissionDirective,
  ],
  providers: [],
  exports: [
    PermissionDirective
  ]
})
export class CRoleManagementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CRoleManagementModule,
      providers: [
        PermissionService,
      ]
    };
  }
}
