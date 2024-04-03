import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    removeRefreshToken(): void {
        localStorage.removeItem('refreshToken');
    }
}