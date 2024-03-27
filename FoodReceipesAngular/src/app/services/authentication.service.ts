import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// import { apiUrls } from 'src/enviroment/apiUrls';
import { apiUrls } from '../../enviroment/apiUrls';
import { environment } from '../../enviroment/environment';
const _baseUrl = environment.BEServer.DevEnviroment;
const _apiUrl = apiUrls.Authentication;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
   
  });

  constructor(private _httpClient: HttpClient) {}

  SignIn(_data: any) {
    return this._httpClient.post(_baseUrl + _apiUrl.SignIn, _data, {
      headers: this.headers,
    });
  }

  SignUp(_data: any) {
    return this._httpClient.post<any>(_baseUrl + _apiUrl.SignUp, _data, {
      headers: this.headers,
    });
  }

  findEmail(_data: any) {
    
    return this._httpClient.get<any>(
      _baseUrl + _apiUrl.findEmail + '?email=' + _data,
      { headers: this.headers }
    );
  }

  ChangePassword(_data: any) {
    return this._httpClient.patch<any>(
      _baseUrl +
        _apiUrl.changepassword +
        '?email=' +
        _data.emailId +
        '&newPassword=' +
        _data.password,
      null,
      { headers: this.headers }
    );
  }
}
