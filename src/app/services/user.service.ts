import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/Iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://dummyapi.io/data/v1/';

  constructor(private _HttpClient: HttpClient) {}

  getUserById(id: string): Observable<IUser> {
    return this._HttpClient.get<IUser>(`${this.baseUrl}user/${id}`, {
      headers: new HttpHeaders({
        'app-id': '64fc4a747b1786417e354f31',
      }),
    });
  }

  getUsers(): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}user`, {
      headers: new HttpHeaders({
        'app-id': '64fc4a747b1786417e354f31',
      }),
    });
  }
  addUser(addedUser: any): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${this.baseUrl}user/create`,
      addedUser,
      {
        headers: new HttpHeaders({
          'app-id': '64fc4a747b1786417e354f31',
        }),
      }
    );
  }

  updateUser(updatedUser: any, id: string): Observable<IUser> {
    return this._HttpClient.put<any>(`${this.baseUrl}user/${id}`, updatedUser, {
      headers: new HttpHeaders({
        'app-id': '64fc4a747b1786417e354f31',
      }),
    });
  }
  deleteUser(id: string): Observable<string> {
    return this._HttpClient.delete<string>(`${this.baseUrl}user/${id}`, {
      headers: new HttpHeaders({
        'app-id': '64fc4a747b1786417e354f31',
      }),
    });
  }
}
