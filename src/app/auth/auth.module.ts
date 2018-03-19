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
import { EventsModule } from "./events/events.module";
import { EventsComponent } from "./events/events.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";

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
        path: 'home', component: HomeComponent, data: {title: 'Home'}
      },
      {
        path: 'events', component: EventsComponent, data: {title: 'Events'}
      },
      {
        path: 'events/new', component: EventDetailComponent, data: {title: 'Create Event'}
      },
      {
        path: 'event/:id', component: EventDetailComponent, data: {title: 'Event Detail'}
      },
      {
        path: 'profile', component: ProfileComponent, data: {title: 'Profile'}
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
    ProfileModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  declarations: [AuthComponent, ToolbarComponent],
})
export class AuthModule {
}
