import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${environment.apiUrl}/users`);
  }

  public createUser(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${environment.apiUrl}/users`, user);
  }

  public updateUser(id: number, user: UserModel): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${environment.apiUrl}/users/${id}`, user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/users/${id}`);
  }
}
