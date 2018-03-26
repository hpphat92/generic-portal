import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { CustomAuthService } from './api/customAuth.service';
import { EventsService } from './api/events.service';
import { GetStorageTokenService } from './api/getStorageToken.service';
import { ItemService } from './api/item.service';
import { NotificationInstallationsService } from './api/notificationInstallations.service';
import { PlacesService } from './api/places.service';
import { PlacesAdminService } from './api/placesAdmin.service';
import { UserService } from './api/user.service';
import { UserConfigService } from './api/userConfig.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    CustomAuthService,
    EventsService,
    GetStorageTokenService,
    ItemService,
    NotificationInstallationsService,
    PlacesService,
    PlacesAdminService,
    UserService,
    UserConfigService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
