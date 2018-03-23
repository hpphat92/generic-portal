import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { Permission } from '../app.constant';
import { CanAuthorized } from '../shared/guard/guard.module';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { UserInfoResolve } from '../shared/guard/user-info.resolve';
import { EventsModule } from './events/events.module';
import { EventsComponent } from './events/events.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { GooglePlaceModule } from './google-place/google-place.module';
import { GooglePlaceComponent } from './google-place/google-place.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersModule } from './users/users.module';
import { SavedPlaceModule } from './saved-place/saved-place.module';
import { SavedPlaceComponent } from './saved-place/saved-place.component';
import { PendingChangesGuard } from '../shared/guard/can-deactive';
import { SavedPlaceDetailComponent } from './saved-place/saved-place-detail/saved-place-detail.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    resolve: {
      userInfo: UserInfoResolve
    },
    canActivateChild: [CanAuthorized],
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full',
      },
      {
        path: 'home', component: HomeComponent, data: { title: 'Home' }
      },
      {
        path: 'events', component: EventsComponent, data: { title: 'Events' }
      },
      {
        path: 'google-place',
        component: GooglePlaceComponent,
        data: { title: 'Google Places Search' },
        canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'saved-places', component: SavedPlaceComponent, data: { title: 'Saved Places' }
      },
      {
        path: 'saved-place/:id', component: SavedPlaceDetailComponent, data: { title: 'Saved Place Detail' }
      },
      {
        path: 'events/new', component: EventDetailComponent, data: { title: 'Create Event' }
      },
      {
        path: 'event/:id', component: EventDetailComponent, data: { title: 'Event Detail' }
      },
      {
        path: 'users', component: UsersComponent, data: { title: 'Users' }
      },
      {
        path: 'user/:id', component: UserDetailComponent, data: { title: 'User Detail' }
      },
      {
        path: 'profile', component: ProfileComponent, data: { title: 'Profile' }
      },
      {
        path: '**', redirectTo: 'home'
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    EventsModule,
    UsersModule,
    ProfileModule,
    GooglePlaceModule,
    SavedPlaceModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  declarations: [AuthComponent, ToolbarComponent],
})
export class AuthModule {
}
