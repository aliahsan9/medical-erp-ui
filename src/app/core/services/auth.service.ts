import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7165/api/auth';

  constructor(private http: HttpClient) {}

  // =========================
  // LOGIN
  // =========================
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data)
      .pipe(
        map((res: any) => {
          if (res?.data?.token) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
          }
          return res;
        })
      );
  }

  // =========================
  // REGISTER
  // =========================
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // =========================
  // LOGOUT
  // =========================
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // =========================
  // CHECK LOGIN
  // =========================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // =========================
  // GET USER
  // =========================
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}