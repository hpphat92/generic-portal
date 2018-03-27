import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ImageUploaderComponent, multi: true }
  ],
})
export class ImageUploaderComponent implements OnInit, ControlValueAccessor {
  writeValue(value: any): void {
    console.log(value);
    if (value) {
      this.imageUrl = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }

  public imageUrl;
  public propagateChange: any = () => {
  };
  public uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  constructor(private injector: Injector) {
  }

  public onUploadOutput(output: UploadOutput, file: any): any {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'https://trabbleclientportalapi.azurewebsites.net/api/files',
          method: 'POST',
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOiIzZjc3MGY3OGM2ODQ0NDFhOTNlYzJmMzNkMTEwOWM4ZSIsIkV4cGlyZWRJblV0YyI6IjIwMTgtMDItMDZUMTI6NTk6MTUuODA0NTY5OVoifQ.Xj34mCYnr1ZG2hhYNm2XDQ64dlYFrv8mdR0m_di45h8' }
        };
        if (file.value) {
          this.uploadInput.emit(event);
        }
        break;
      case 'done':
        // this.srcChange.emit(this.userAvatar = output.file.response.data.url);
        this.propagateChange(output.file.response.data.url);
        this.imageUrl = output.file.response.data.url;
        break;
    }
  }

}
