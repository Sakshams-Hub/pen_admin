import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.scss',
   animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('visible => *', animate('75ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ]),
  ],
})
export class AdminRegisterComponent {
 isRightPanelActive: boolean = false;
    registrationData = { admin_username: '', admin_password: '' };

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  onSubmit() {
    this.http.post<any>('http://localhost:3000/admin-register', this.registrationData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.registrationData = { admin_username: '', admin_password: '' };
        this.snackBar.open("User registered successfully!", "Close", { duration: 2500 });
        this.router.navigate(['/admin_login']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.snackBar.open("Registering Failed! Please try again.", "Close", { duration:  3000 });
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/admin_login']);
  }
}
