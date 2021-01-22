import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    //路由守卫
    isLoggodIn = false;
    login() {
        this.isLoggodIn = true;
    }
    logout() {
        this.isLoggodIn = false;
    }
    loggedIn() {
        return this.isLoggodIn;
    }
}