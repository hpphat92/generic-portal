import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import AppConstant from '../../app.constant';

@Injectable()
export class EventsService {
  constructor(private http: HttpClient) {

  }

  public getEvents() {
    return this.http.get(`${AppConstant.domain}/api/events`);
  }

  public getById(id) {
    return this.http.get(`${AppConstant.domain}/api/events/${id}`)
  }

  public create(model) {
    return this.http.post(`${AppConstant.domain}/api/events`, model)
  }

  public update(model) {
    return this.http.patch(`${AppConstant.domain}/api/events/${model.Id}`, model)
  }

  public removeById(id) {
    return this.http.delete(`${AppConstant.domain}/api/events/${id}`)
  }
}

