import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { GenericListComponent } from './generic-list-component';
import { GenericDetailComponent } from './generic-detail-component';
import { NgUploaderModule } from 'ngx-uploader';
import { GenericService } from './generic.service';
import { APIS } from '../shared/api';
import { Route, Router } from '@angular/router';
import * as _ from 'lodash';
import { RatingModule } from 'ngx-rating';

@NgModule({
  declarations: [
    GenericListComponent,
    GenericDetailComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgUploaderModule,
    RatingModule
  ],
  entryComponents: [GenericListComponent, GenericDetailComponent],
  exports: [],
  providers: []
})
export class GenericModule {
  constructor(private router: Router) {
    _.forEach(GenericService.config, (c: any) => {
      let findingConfig = _.find(this.router.config, { path: c.isAuth ? 'auth' : 'unauth' });
      if (findingConfig) {
        findingConfig.children = [
          {
            path: (c.path || c.moduleName) + '/all',
            component: GenericListComponent,
            data: { title: c.pageTitle, roles: c.roles },
            resolve: { config: GenericService.getProvideInjectKeyFromModuleName(c.moduleName, 'list') },
          }, {
            path: (c.path || c.moduleName) + '/new',
            component: GenericDetailComponent,
            data: { title: c.pageTitle, roles: c.roles },
            resolve: { config: GenericService.getProvideInjectKeyFromModuleName(c.moduleName, 'detail') },
          }, {
            path: (c.path || c.moduleName) + '/:id',
            component: GenericDetailComponent,
            data: { title: c.pageTitle, roles: c.roles },
            resolve: { config: GenericService.getProvideInjectKeyFromModuleName(c.moduleName, 'detail') },
          },
          ...findingConfig.children
        ] as Route[];
      }
    });
    this.router.resetConfig(this.router.config);
  }

  public static forRoot(config): ModuleWithProviders {
    const providers = [...config.map(c => {
      return [
        {
          provide: GenericService.getProvideInjectKeyFromModuleName(c.moduleName, 'list'),
          useValue: () => c
        },
        {
          provide: GenericService.getProvideInjectKeyFromModuleName(c.moduleName, 'detail'),
          useValue: () => c
        }
      ]
    }), ...APIS.map((api) => {
      return {
        provide: api.name,
        useClass: api
      }
    })];
    GenericService.config = config;
    return { ngModule: GenericModule, providers: [GenericService, ...providers] };
  }
}
