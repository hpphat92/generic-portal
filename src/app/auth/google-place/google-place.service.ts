import { Injectable, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import AppConstant from '../../app.constant';
import * as _ from 'lodash';
import * as _config from '../../../config.json';
import { MatPaginator } from '@angular/material';

let config = _config as any;

@Injectable()
export class GooglePlaceService {


  private service;

  constructor(private http: HttpClient) {

  }

  public search(_model) {
    let google = (window as any).google;
    let model = {
      radius: 200,
      longitude: 50,
      latitude: 50,
      type: '',
      keyword: '',
      ..._model
    };
    this.service = new google.maps.places.PlacesService(document.getElementById('map_null'));
    return new Promise((resolve) => {
      let modelToPost = {
        location: new google.maps.LatLng(model.latitude, model.longitude),
        keyword: model.keyword,
        radius: model.radius,
        type: model.type,
      };
      if (model.pageToken) {
        modelToPost = {
          Ec: model.pageToken // Debug for detail :(
        } as any;
      }
      this.service.nearbySearch(modelToPost, (resp, status, pagination) => {
        resolve({
          resp,
          pagination
        });
      });
    });

  }

  public getDetail(placeId) {
    let google = (window as any).google;
    if(!this.service){
      this.service = new google.maps.places.PlacesService(document.getElementById('map_null'));
    }
    return new Promise((resolve) => {
      this.service.getDetails({
        placeId
      }, (resp) => {
        resolve(resp);
      })
    })
  }
}

