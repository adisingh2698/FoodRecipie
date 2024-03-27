import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
import { localStorageSession } from '../shared/localStorage';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Service;



@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  AddProfile(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddProfile, data, {
      headers: this.multipartheaders,
    });
  }

  UpdateProfile(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateProfile, _data, {
      headers: this.multipartheaders,
    });
  }

  GetProfile(data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetProfile + '?UserId=' + data,
      {
        headers: this.headers,
      }
    );
  }

  GetReceipesByCategory(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetReceipesByCategory + '?keyword=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  GetReceipesByKeyword(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetReceipesByKeyword + '?keyword=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  AddUserReceipe(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddUserReceipe, data, {
      headers: this.multipartheaders,
    });
  }

  UpdateUserReceipe(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateUserReceipe, _data, {
      headers: this.multipartheaders,
    });
  }

  GetUserReceipeList(_data: any) {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetUserReceipeList + '?UserId=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  DeleteUserReceipe(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteUserReceipe + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }

  GetReceipesDetailList() {
    return this._httpClient.get(_baseUrl + _apiUrl.GetReceipesDetailList, {
      headers: this.headers,
    });
  }

  AddUserReview(data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.AddUserReview, data, {
      headers: this.multipartheaders,
    });
  }

  UpdateUserReview(_data: any) {
    return this._httpClient.put(_baseUrl + _apiUrl.UpdateUserReview, _data, {
      headers: this.multipartheaders,
    });
  }

  GetUserReviewList() {
    return this._httpClient.get(
      _baseUrl + _apiUrl.GetUserReviewList,
      {
        headers: this.headers,
      }
    );
  }

  DeleteUserReview(_data: any) {
    return this._httpClient.delete(
      _baseUrl + _apiUrl.DeleteUserReview + '?Id=' + _data,
      {
        headers: this.headers,
      }
    );
  }
}
