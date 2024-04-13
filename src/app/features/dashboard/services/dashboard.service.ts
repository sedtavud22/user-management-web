import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateUser,
  GetAllResponse,
  Response,
  User,
} from '../models/user.model';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllUsers(
    query?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number
  ): Observable<GetAllResponse<User[]>> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize);
    }

    return this.http.get<GetAllResponse<User[]>>(
      `${environment.apiBaseUrl}/api/Users/datatable`,
      { params }
    );
  }

  getAllRoles(): Observable<Response<Role[]>> {
    return this.http.get<Response<Role[]>>(
      `${environment.apiBaseUrl}/api/Roles`
    );
  }

  getAllPermissions(): Observable<Response<Permission[]>> {
    return this.http.get<Response<Permission[]>>(
      `${environment.apiBaseUrl}/api/Permissions`
    );
  }

  createUser(data: CreateUser): Observable<Response<User>> {
    return this.http.post<Response<User>>(
      `${environment.apiBaseUrl}/api/Users`,
      data
    );
  }
}
