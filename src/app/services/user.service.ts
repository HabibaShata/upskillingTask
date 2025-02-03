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
    return this._HttpClient.get<IUser>(`${this.baseUrl}user/${id}`);
  }

  getUsers(): Observable<any> {
    return this._HttpClient.get<any>(`${this.baseUrl}user`);
  }
  addUser(addedUser: any): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${this.baseUrl}user/create`,
      addedUser
    );
  }

  updateUser(updatedUser: any, id: string): Observable<IUser> {
    return this._HttpClient.put<any>(`${this.baseUrl}user/${id}`, updatedUser);
  }
  deleteUser(id: string): Observable<string> {
    return this._HttpClient.delete<string>(`${this.baseUrl}user/${id}`);
  }
}
