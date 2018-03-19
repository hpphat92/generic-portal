import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth';
import {UploadInput, UploadOutput} from 'ngx-uploader';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  public uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  @Input()
  public edit: boolean;

  @Input('src')
  set imageSrc(val: string) {
    this.userAvatar = val || this.defaultAvatar;
  }

  @Output()
  public srcChange: EventEmitter<string> = new EventEmitter<string>();

  public src: string;

  public userAvatar: string;

  public defaultAvatar = 'assets/images/noavatar.jpg';

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    if (this.src === 'me' || !this.src) {
      let authService = this.injector.get(AuthService);
      this.userAvatar = authService.currentUser.avatarUrl || this.defaultAvatar;
      authService.currentUser$.subscribe((userInfo) => {
        if (userInfo) {
          this.userAvatar = userInfo.avatarUrl || this.defaultAvatar;
        } else {
          this.userAvatar = this.defaultAvatar;
        }
      });
    } else {
      this.userAvatar = this.src;
    }
  }

  public onUploadOutput(output: UploadOutput, file: any): any {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'https://trabbleclientportalapi.azurewebsites.net/api/files',
          method: 'POST',
          headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOiIzZjc3MGY3OGM2ODQ0NDFhOTNlYzJmMzNkMTEwOWM4ZSIsIkV4cGlyZWRJblV0YyI6IjIwMTgtMDItMDZUMTI6NTk6MTUuODA0NTY5OVoifQ.Xj34mCYnr1ZG2hhYNm2XDQ64dlYFrv8mdR0m_di45h8'}
        };
        if (file.value) {
          this.uploadInput.emit(event);
        }
        break;
      case 'done':
        this.srcChange.emit(this.userAvatar = output.file.response.data.url);
        break;
    }
  }

}
