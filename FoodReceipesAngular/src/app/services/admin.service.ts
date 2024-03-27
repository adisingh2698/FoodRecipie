import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Business;

// const _authToken = localStorage.getItem('Admin-Token');

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private _httpClient: HttpClient,
    private _localStorage: localStorageSession
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  multipartheaders = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${this._localStorage.getItem('Common-Token')}`,
  });

  // 'Content-Type', 'text/plain'
  AddReceipesDetail(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddReceipesDetail, _data, {
      headers: this.multipartheaders,
    });
  }

  UpdateReceipesDetail(_data: any) {
    return this._httpClient.put(
      _baseUrl + _apiUrl.UpdateReceipesDetail,
      _data,
      {
        headers: this.multipartheaders,
      }
    );
  }

  GetReceipesDetailList() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetReceipesDetailList, {
      headers: this.headers,
    });
  }

  DeleteReceipesDetailL(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteReceipesDetailL + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
