import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor, ErrorsInterceptor } from './interceptors';
import { ANIMATION_TYPES, LoadingModule } from 'ngx-loading';
import { ComponentModule } from './component/component.module';
import { GuardModule } from './guard/guard.module';
import { RouterModule } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { BaseForm } from './form';
import { CRoleManagementModule } from './services/permission';

@NgModule({
  declarations: [BaseForm],
  imports: [
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    GuardModule,
    RouterModule,
    MomentModule,
    CRoleManagementModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: 'my-trabble',
      storageType: 'localStorage'
    }),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#f78e05',
      secondaryColour: '#35b3ff',
      tertiaryColour: '#ffb400',
      fullScreenBackdrop: true
    })
  ],
  exports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    LoadingModule,
    ComponentModule,
    GuardModule,
    RouterModule,
    BaseForm,
    CRoleManagementModule
  ],
  entryComponents: [],
  providers: [
    // ...SHARED_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    }
  ]
})
export class SharedModule {

}
