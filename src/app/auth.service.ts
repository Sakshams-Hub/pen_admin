import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInAdmin: string | null = null;
  private loggedInAdminId: number | null = null; // Add this property

  isLoggedIn(): boolean {
    return !!this.loggedInAdmin;
  }

  setLoggedInAdmin(username: string, admin_id: number) {
    this.loggedInAdmin = username;
    this.loggedInAdminId = admin_id; // Set the logged-in user ID
  }

  getLoggedInAdmin(): string | null {
    return this.loggedInAdmin;
  }

  getLoggedInAdminId(): number | null {
    return this.loggedInAdminId; // Retrieve the logged-in user ID
  }

  logout() {
    this.loggedInAdmin = null;
    this.loggedInAdminId = null;
  }
}
