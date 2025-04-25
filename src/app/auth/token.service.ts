import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  /**
   * Saves the session token in the local storage.
   * @param {string} token - The session token to be saved
   */
  saveToken(token: string): void {
    localStorage.setItem('sessionToken', token);
  }

  /**
   * Retrieves the session token from the local storage.
   * @returns {string | null} - The session token if it exists, otherwise `null`
   */
  getToken(): string | null {
    return localStorage.getItem('sessionToken');
  }

  /** Removes the session token from the local storage */
  removeToken(): void {
    localStorage.removeItem('sessionToken');
  }

  /**
   * Saves the refresh token in the local storage.
   * @param {string} token - The refresh token to be saved.
   */
  saveRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  /**
   * Retrieves the refresh token from the local storage.
   * @returns {string | null} - The refresh token if it exists, otherwise `null`.
   */
  getRefreshToken(): string | null {
      return localStorage.getItem('refreshToken');
  }

  /** Removes the refresh token from the local storage */
  removeRefreshToken(): void {
      localStorage.removeItem('refreshToken');
  }
}
