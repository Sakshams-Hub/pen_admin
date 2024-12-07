import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 import { AuthService } from '../auth.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
  animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('visible => *', animate('75ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]),
  ],
})
export class AdminLoginComponent {
     loginData = { admin_username: '', admin_password: '', admin_id: "" };

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private authService: AuthService) { }

onSubmit() {
  this.http.post('http://localhost:3000/admin-login', this.loginData).subscribe(
    (response: any) => {
      console.log('Login response:', response); // Log the entire response

      // Check if the admin_id property exists in the response
      if ('admin_id' in response) {
        console.log('Admin ID:', response.admin_id); // Log the user ID if it exists
        // Set the logged-in user and user ID in AuthService
        this.authService.setLoggedInAdmin(response.admin_username, response.admin_id);
      

        this.snackbar.open("Welcome ", "", { duration: 3000 });

        this.router.navigate(['/dashboard']); // Navigate to dashboard
      } else {
        console.error('Admin ID is missing in the response');
      }
    },
    (error) => {
      console.error('Login failed', error);
      this.snackbar.open("Invalid username or password", "Try again", { duration: 3000 });
    }
  );
}


  goToSignupPage() {
    this.router.navigate(['/admin_register']);
  }
}
