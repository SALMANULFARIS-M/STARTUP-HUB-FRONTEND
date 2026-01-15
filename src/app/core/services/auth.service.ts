import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 constructor(private api: ApiService) {}

  login(credentials: { email: string; password: string }) {
    return this.api.post('/auth/login', credentials);
  }
}
